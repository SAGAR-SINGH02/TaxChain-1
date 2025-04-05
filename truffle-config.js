const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(); // For .env variables

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache GUI default port
      network_id: "*",       // Match any network id
    },

    // Optional: For deployment on Goerli or Sepolia testnet
    /*
    goerli: {
      provider: () =>
        new HDWalletProvider(process.env.MNEMONIC, `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
    */
  },

  // Set default mocha options here
  mocha: {
    timeout: 100000
  },

  // Compiler configuration
  compilers: {
    solc: {
      version: "0.8.20",    // Match your Solidity version
    }
  }
};
