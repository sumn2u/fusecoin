const SHA256 = require("crypto-js/sha256");
// block contains index, timestamp, data and previous hash
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()]; // initialize the chain with default value
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0"); 
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // index to point the previous block
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // temparing with data and hash checking
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let fuseCoin = new Blockchain();
fuseCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
fuseCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));


console.log('Blockchain valid? ' + fuseCoin.isChainValid());

console.log('Changing a block...');
fuseCoin.chain[1].data = { amount: 100 };
// fuseCoin.chain[1].hash = fuseCoin.chain[1].calculateHash();

console.log("Blockchain valid? " + fuseCoin.isChainValid());

// console.log(JSON.stringify(fuseCoin, null, 4));
