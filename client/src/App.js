import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import TaxChainABI from './TaxChainABI.json';
import Chatbot from './components/Chatbot'; // Ensure this component exists

const contractAddress = "0x2d3DAEd9279841e7A8e0000D87f7aEAe72BEe445"; // Replace with actual contract address

function App() {
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const uploadToIPFS = async () => {
    if (!file) {
      setStatus("❌ No file selected");
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.web3.storage/upload', formData, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_WEB3_STORAGE_TOKEN}`,
        },
      });
      return res.data.cid;
    } catch (error) {
      console.error("IPFS Upload Failed:", error);
      setStatus("❌ IPFS upload failed");
      return null;
    }
  };

  const fileTax = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const fileHash = await uploadToIPFS();
    if (!fileHash) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, TaxChainABI, signer);

    try {
      const tx = await contract.fileTax(
        ethers.utils.parseEther(amount),
        fileHash
      );
      await tx.wait();
      setStatus("✅ Tax filed successfully with IPFS record!");
    } catch (error) {
      console.error("Tax filing failed:", error);
      setStatus("❌ Tax filing failed");
    }
  };

  const requestRefund = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, TaxChainABI, signer);

    try {
      const tx = await contract.requestRefund();
      await tx.wait();
      setStatus("✅ Refund requested!");
    } catch (error) {
      console.error("Refund failed:", error);
      setStatus("❌ Refund request failed");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>💸 TaxChain Filing DApp</h1>
      
      <input
        type="text"
        placeholder="Enter amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '8px', width: '250px', marginBottom: '10px' }}
      /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: '10px' }}
      /><br />

      <button onClick={fileTax} style={{ marginRight: '10px' }}>📂 File Tax</button>
      <button onClick={requestRefund}>💰 Request Refund</button>

      <p>Status: {status}</p>

      {/* Chatbot Embed */}
      <iframe
        title="TaxChain Chatbot"
        width="350"
        height="500"
        allow="microphone;"
        src="https://console.dialogflow.com/api-client/demo/embedded/YOUR_DIALOGFLOW_BOT_ID"
        style={{ border: 'none', marginTop: '20px' }}
      />
    </div>
  );
}

export default App;
