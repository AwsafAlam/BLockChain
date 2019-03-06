const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index, timestamp , data , previoushash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
    }

    get getIndex() {
      return this.index;
    }
    
    calculateHash(){
        return SHA256(this.index + this.previoushash+ JSON.stringify(this.data)).toString();
    }
}

class BlockChain{

    constructor(){
        this.chain = [this.createGenesisBLock()];
    }

    createGenesisBLock(){
        return new Block(0,'02/03/2019',"Genesis","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previoushash =  this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

let kolpocoin = new BlockChain();

kolpocoin.addBlock(new Block(1,"10/03/2021",{amount:4}));
kolpocoin.addBlock(new Block(1,"10/03/2021",{amount:4}));
kolpocoin.addBlock(new Block(1,"10/03/2021",{amount:4}));

console.log(JSON.stringify(kolpocoin,null,4));
