// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LPoint {
    string public name = "LPoint";
    string public symbol = "LP";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public allowedContracts;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event ContractAllowed(address indexed contractAddress, bool status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 10_000_000 * 10**uint256(decimals); // Total supply 10 juta LP
        balanceOf[owner] = totalSupply;
    }

    function setAllowedContract(address _contract, bool _status) external onlyOwner {
        allowedContracts[_contract] = _status;
        emit ContractAllowed(_contract, _status);
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(msg.sender == owner || allowedContracts[msg.sender], "Unauthorized transfer");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
