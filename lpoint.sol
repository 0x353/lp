// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LPointToken {
    string public name = "LPoint";
    string public symbol = "LPT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;
    address public spinBetContract;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public allowedContracts;  // Menyimpan kontrak yang diizinkan

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || msg.sender == spinBetContract || allowedContracts[msg.sender], "Not authorized to transfer");
        _;
    }

    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function setSpinBetContract(address _spinBetContract) public onlyOwner {
        spinBetContract = _spinBetContract;
    }

    function setAllowedContract(address contractAddr, bool status) public onlyOwner {
        allowedContracts[contractAddr] = status;
    }

    function transfer(address to, uint256 amount) public onlyAuthorized returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public onlyOwner returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public onlyAuthorized returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Allowance exceeded");
        balanceOf[from] -= amount;
        allowance[from][msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
}
