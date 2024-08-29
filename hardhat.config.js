require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const API_KEY = process.env.ALCHEMY_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/W3blepCxPkOC3E9cWu_t3BoLzc9WmCtQ`,
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY]
    }, 
  },
  etherscan: {
    apiKey: "CJWCNUFN1E5TQQ9V3XN81G5358R14IT33U",
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      }
    ]
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
