const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Token', () => {

    let token;

    beforeEach(async () => {
        // Fetch and Deploy token onto blockchain
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy('Dapp University', 'DAPP', 21000000);
    });

    describe('Deployment', () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = '18';
        const totalSupply = '21000000';
        
        it('Has correct name', async () => {
            expect(await token.name()).to.equal(name);
        });
    
        it('Has correct symbol', async () => {
            expect(await token.symbol()).to.equal(symbol);
        });
      
        it('Has correct decimals', async () => {
            expect(await token.decimals()).to.equal(decimals);
        });
    
        it('Has correct total supply', async () => {
            expect(await token.totalSupply()).to.equal(tokens(totalSupply));
        });
    });
});
