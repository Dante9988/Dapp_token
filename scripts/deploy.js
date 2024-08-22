const { ethers } = require("hardhat");

async function main() {
  
  // Fetch contract

  const Token = await ethers.getContractFactory("Token");
  
  // Deploy contract
  const token = await Token.deploy();
  const deployedToken = await token.deployed();
  console.log("Token deployed to address:", deployedToken.address);

  const name = await token.name();
  console.log("Token name:", name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });