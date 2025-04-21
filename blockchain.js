const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, transactions, previousHash = "") {
        this.index = index;
        this.timestamp = new Date();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transactions) {
        const newBlock = new Block(
            this.chain.length,
            transactions,
            this.getLatestBlock().hash
        );
        this.chain.push(newBlock);
    }
}

module.exports = Blockchain;
