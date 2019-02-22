# Ethereum

Install Geth

Install ganache [here](https://truffleframework.com/ganache)

Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.

Ganache UI allows you to inspect blocks and transactions in a more userfriendly way. It is an in memory ethereum node that allows us to test contracts locally.

- Check whether Node js and nom are installed. `node -v` and `npm -v`
- Install truffle framework `sudo npm install -g truffle` check using `truffle version`

## Setting up a private Ethereum node

We will first istall a private Ethereum instance with geth. First create a private folder. `mkdir private`, declare the genesis block in the private folder.

We will not code the genesis block from scratch,  instead will use `puppeth`

```bash
+-----------------------------------------------------------+
| Welcome to puppeth, your Ethereum private network manager |
|                                                           |
| This tool lets you create a new Ethereum network down to  |
| the genesis block, bootnodes, miners and ethstats servers |
| without the hassle that it would normally entail.         |
|                                                           |
| Puppeth uses SSH to dial in to remote servers, and builds |
| its network components out of Docker containers using the |
| docker-compose toolset.                                   |
+-----------------------------------------------------------+

Please specify a network name to administer (no spaces, hyphens or capital letters please)
> Awsaf
ERROR[02-23|04:06:20.358] I also like to live dangerously, still no spaces, hyphens or capital letters 
> awsaf

Sweet, you can set this via --network=awsaf next time!

INFO [02-23|04:06:30.539] Administering Ethereum network           name=awsaf
WARN [02-23|04:06:30.539] No previous configurations found         path=/home/awsaf/.puppeth/awsaf

What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
>
```

select 2, configure new genesis use 1. Ethash as the consensus algorithm. Final result after configuring the genesis block.

```bash
> awsaf

Sweet, you can set this via --network=awsaf next time!

INFO [02-23|04:06:30.539] Administering Ethereum network           name=awsaf
WARN [02-23|04:06:30.539] No previous configurations found         path=/home/awsaf/.puppeth/awsaf

What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
> 2

What would you like to do? (default = create)
 1. Create new genesis from scratch
 2. Import already existing genesis
> 1

Which consensus engine to use? (default = clique)
 1. Ethash - proof-of-work
 2. Clique - proof-of-authority
> 1

Which accounts should be pre-funded? (advisable at least one)
> 0x

Should the precompile-addresses (0x1 .. 0xff) be pre-funded with 1 wei? (advisable yes)
> yes

Specify your chain/network ID if you want an explicit one (default = random)
> 4224
INFO [02-23|04:10:40.363] Configured new genesis block 

What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
> 2

 1. Modify existing fork rules
 2. Export genesis configurations
 3. Remove genesis configuration
> 2

Which folder to save the genesis specs into? (default = current)
  Will create awsaf.json, awsaf-aleth.json, awsaf-harmony.json, awsaf-parity.json
>
INFO [02-23|04:11:49.988] Saved native genesis chain spec          path=awsaf.json
INFO [02-23|04:11:49.991] Saved genesis chain spec                 client=aleth path=awsaf-aleth.json
INFO [02-23|04:11:49.994] Saved genesis chain spec                 client=parity path=awsaf-parity.json
INFO [02-23|04:11:50.004] Saved genesis chain spec                 client=harmony path=awsaf-harmony.json
What would you like to do? (default = stats)
 1. Show network stats
 2. Manage existing genesis
 3. Track new remote server
 4. Deploy network components
>
```

## Understanding an Ethereum Node

The config in the json structure describes the properties of a chain. TImestamp indicates the level of difficulty to be imposed by the consensus algorithm, also indicates the order of a block.

Difficulty is the computational complexity provided by the consensus algo.

creating more private nodes :

`geth --datadir . init awsaf.json`

`datadir` is the target dir where the private node data is saved. After execution :

```bash
INFO [02-23|04:24:30.515] Maximum peer count                       ETH=25 LES=0 total=25
INFO [02-23|04:24:30.517] Allocated cache and file handles         database=/home/awsaf/Desktop/BLockChain/Geth/private/geth/chaindata cache=16 handles=16
INFO [02-23|04:24:30.680] Writing custom genesis block 
INFO [02-23|04:24:30.700] Persisted trie from memory database      nodes=354 size=51.71kB time=5.355239ms gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [02-23|04:24:30.700] Successfully wrote genesis state         database=chaindata                                                  hash=d51396…c81590
INFO [02-23|04:24:30.700] Allocated cache and file handles         database=/home/awsaf/Desktop/BLockChain/Geth/private/geth/lightchaindata cache=16 handles=16
INFO [02-23|04:24:31.069] Writing custom genesis block 
INFO [02-23|04:24:31.086] Persisted trie from memory database      nodes=354 size=51.71kB time=3.075823ms gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [02-23|04:24:31.086] Successfully wrote genesis state         database=lightchaindata                                                  hash=d51396…c81590
```

Using this command, a chain is created.

## Transactions

We create 3 new accounts.

- Receive minimg awards
- Perform transactions

Use the command `geth --datadir . account new`

```bash
INFO [02-23|04:28:14.046] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {ffab7488dc53756b33770354f68dbefffcb8ecff}
```

Running the same command will creates more accounts. The account ids will be different each time since they are randomly generated.

- `Address: {ffab7488dc53756b33770354f68dbefffcb8ecff}`
- `Address: {383e052fdb624d00e536c6f90befeb0a353c716a}`
- `Address: {ae4e36196f2c5f0f70cdfa5f4a7e432a98131f8a}`

These addresses are also stored in the keystore folder. `geth --datadir .  account list` gives us the list of exsting accounts.

```shell
Account #0: {ffab7488dc53756b33770354f68dbefffcb8ecff} keystore:///home/awsaf/Desktop/BLockChain/Geth/private/keystore/UTC--2019-02-22T22-28-37.303384115Z--ffab7488dc53756b33770354f68dbefffcb8ecff
Account #1: {383e052fdb624d00e536c6f90befeb0a353c716a} keystore:///home/awsaf/Desktop/BLockChain/Geth/private/keystore/UTC--2019-02-22T22-32-17.492691158Z--383e052fdb624d00e536c6f90befeb0a353c716a
Account #2: {ae4e36196f2c5f0f70cdfa5f4a7e432a98131f8a} keystore:///home/awsaf/Desktop/BLockChain/Geth/private/keystore/UTC--2019-02-22T22-33-52.089455393Z--ae4e36196f2c5f0f70cdfa5f4a7e432a98131f8a
```
