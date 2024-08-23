const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Token', () => {

    let token, accounts, deployer, receiver;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy('Dapp University', 'DAPP', 21000000);

        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1]
    });

    describe('Deployment', () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = '18';
        const totalSupply = '21000000';
        
        it('gas correct name', async () => {
            expect(await token.name()).to.equal(name);
        });
    
        it('gas correct symbol', async () => {
            expect(await token.symbol()).to.equal(symbol);
        });
      
        it('gas correct decimals', async () => {
            expect(await token.decimals()).to.equal(decimals);
        });
    
        it('has correct total supply', async () => {
            expect(await token.totalSupply()).to.equal(tokens(totalSupply));
        });

        it('assigns total supply to deployer', async () => {
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(totalSupply));
        });
    });

    describe('Success', () => {
        describe('Sending tokens', () => {
            let amount, txn, result;
    
            beforeEach( async () => {
                amount = tokens(100);
                txn = await token.connect(deployer).transfer(receiver.address, amount);
                result = await txn.wait();
            });
    
            it('transfers token balances', async () => {
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(20999900));
                expect(await token.balanceOf(receiver.address)).to.equal(amount);
            });
    
            it('emits a transfer event', async () => {
                const events = result.events[0];
                const args = events.args
                
                expect(events.event).to.equal('Transfer');
                expect(args.from).to.equal(deployer.address);
                expect(args.to).to.equal(receiver.address);
                expect(args.value).to.equal(amount);
            });
        });
    });

    describe('Failure', () => {
        it('rejects insufficient balances',  async () => {
            const invalidAmount = tokens(100000000);
            await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted;
        });

        it('rejects invalid recipent',  async () => {
            const amount = tokens(100);
            const invalidAddress = "0x0000000000000000000000000000000000000000";
            await expect(token.connect(deployer).transfer(invalidAddress, amount)).to.be.reverted;
        });
    });
});
