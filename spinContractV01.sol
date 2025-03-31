// SPDX-License-Identifier: MIT pragma solidity ^0.8.19;

contract SpinBet { struct Bet { address user; uint256 amount; string result; uint256 timestamp; }

mapping(address => Bet[]) private userBets;
Bet[] public publicBets;
uint256 public publicHistoryLimit = 50;
uint256 public spinPrice = 0.000256 ether;
address public owner;
mapping(string => uint256) public lastPrizeTimestamps;

event BetPlaced(address indexed user, uint256 amount, string result, uint256 timestamp);

constructor() {
    owner = msg.sender;
}

modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
}

function placeBet() public payable {
    require(msg.value == spinPrice, "Incorrect ETH amount");
    string memory result = determinePrize();

    Bet memory newBet = Bet(msg.sender, msg.value, result, block.timestamp);
    userBets[msg.sender].push(newBet);
    publicBets.push(newBet);

    if (publicBets.length > publicHistoryLimit) {
        for (uint256 i = 0; i < publicBets.length - 1; i++) {
            publicBets[i] = publicBets[i + 1];
        }
        publicBets.pop();
    }

    emit BetPlaced(msg.sender, msg.value, result, block.timestamp);
}

function determinePrize() internal returns (string memory) {
    uint256 contractBalance = address(this).balance;
    uint256 currentTime = block.timestamp;
    uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 1000;

    if (contractBalance >= 15 ether && isPrizeAvailable("1 ETH Jackpot", 365 days) && random < 5) {
        lastPrizeTimestamps["1 ETH Jackpot"] = currentTime;
        return "1 ETH Jackpot";
    }
    if (contractBalance >= 14 ether && isPrizeAvailable("0.7 ETH Big Win", 365 days) && random < 10) {
        lastPrizeTimestamps["0.7 ETH Big Win"] = currentTime;
        return "0.7 ETH Big Win";
    }
    if (contractBalance >= 11 ether && isPrizeAvailable("iPhone or 0.5 ETH", 180 days) && random < 20) {
        lastPrizeTimestamps["iPhone or 0.5 ETH"] = currentTime;
        return "iPhone or 0.5 ETH";
    }
    if (contractBalance >= 2 ether && isPrizeAvailable("0.1 ETH Monthly Prize", 30 days) && random < 50) {
        lastPrizeTimestamps["0.1 ETH Monthly Prize"] = currentTime;
        return "0.1 ETH Monthly Prize";
    }
    if (contractBalance >= 1.5 ether && isPrizeAvailable("0.05 ETH Monthly Prize", 30 days) && random < 70) {
        lastPrizeTimestamps["0.05 ETH Monthly Prize"] = currentTime;
        return "0.05 ETH Monthly Prize";
    }
    if (contractBalance >= 1 ether && isPrizeAvailable("0.01 ETH Bi-weekly", 14 days) && random < 100) {
        lastPrizeTimestamps["0.01 ETH Bi-weekly"] = currentTime;
        return "0.01 ETH Bi-weekly";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.005 ETH Weekly", 7 days) && random < 150) {
        lastPrizeTimestamps["0.005 ETH Weekly"] = currentTime;
        return "0.005 ETH Weekly";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.001 ETH Five-day Prize", 5 days) && random < 200) {
        lastPrizeTimestamps["0.001 ETH Five-day Prize"] = currentTime;
        return "0.001 ETH Five-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0005 ETH Four-day Prize", 4 days) && random < 250) {
        lastPrizeTimestamps["0.0005 ETH Four-day Prize"] = currentTime;
        return "0.0005 ETH Four-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.000256 ETH Two-day Prize", 2 days) && random < 300) {
        lastPrizeTimestamps["0.000256 ETH Two-day Prize"] = currentTime;
        return "0.000256 ETH Two-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0001 ETH Daily Prize", 1 days) && random < 500) {
        lastPrizeTimestamps["0.0001 ETH Daily Prize"] = currentTime;
        return "0.0001 ETH Daily Prize";
    }
    return "Try Again";
}

function isPrizeAvailable(string memory prize, uint256 interval) internal view returns (bool) {
    if (lastPrizeTimestamps[prize] == 0) {
        return true;
    }
    return block.timestamp >= lastPrizeTimestamps[prize] + interval;
}

function getUserBets() public view returns (Bet[] memory) {
    return userBets[msg.sender];
}

function getPublicBets() public view returns (Bet[] memory) {
    return publicBets;
}

function withdraw(uint256 amount) public onlyOwner {
    require(amount <= address(this).balance, "Insufficient contract balance");
    payable(owner).transfer(amount);
}

}


