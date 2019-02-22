# BLockChain

Understanding the basics of blockchain

## Installing Solidity

Install solidity locally

```shell
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```

## Smart Contracts

```solidity
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain. The line `uint storedData`; declares a state variable called `storedData` of type `uint` (unsigned integer of 256 bits). You can think of it as a single slot in a database that can be queried and altered by calling functions of the code that manages the database. 

In the case of Ethereum, this is always the owning contract. And in this case, the functions set and get can be used to modify or retrieve the value of the variable.
