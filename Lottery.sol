// denotes the Solidity compiler version
pragma solidity ^0.4.17;

contract Lottery {
	// "address" is a datatype
	// see the slides for details
    address public manager;
    address[] public players;
	
	// "msg" is global object. You can use it from any function you create inside a contract.
	// It's a property of a contract.
    function Lottery() public {
        manager = msg.sender;
    }

	// "payable" means this function has to pay some ether if it wants to get executed.
	// Details in the slide
    function enter() public payable {
        // use for validatoin
        // msg.value is in wei
        // player is sending ether
        // convert ether to wei
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
	
	// By using the above random function, the following one generates a random player who is the lucky winner
    function pickWinner() public restricted {
        uint index = random() % players.length;
        
        // transfer ether to the winner
        players[index].transfer(this.balance);
        
        // re initialize the array
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}