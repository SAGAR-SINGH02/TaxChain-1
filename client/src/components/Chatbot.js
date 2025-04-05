import React from 'react';

function Chatbot() {
  return (
    <iframe
      title="TaxChain Chatbot"
      width="350"
      height="500"
      allow="microphone;"
      src="https://console.dialogflow.com/api-client/demo/embedded/YOUR_DIALOGFLOW_BOT_ID"
      style={{ border: 'none', marginTop: '20px' }}
    />
  );
}

export default Chatbot;
