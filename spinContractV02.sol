// SPDX-License-Identifier: MIT pragma solidity ^0.8.19;

contract SpinBet { struct Bet { address user; uint256 amount; string result; uint256 timestamp; }

mapping(address => Bet[]) private userBets;
Bet[] public publicBets;
uint256 public publicHistoryLimit = 50;
uint256 public spinPrice = 0.000256 ether;
uint256 dailyQuota = 0.01 ether;
uint256 dailyUsedQuota = 0;
uint256 lastResetTime = block.timestamp;
address public owner;
mapping(string => uint256) public lastPrizeTimestamps;

event BetPlaced(address indexed user, uint256 amount, string result, uint256 timestamp);

constructor(address _lPointAddress) {
        owner = msg.sender;
        lPointToken = LPoint(_lPointAddress);
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

    if (contractBalance >= 15 ether && isPrizeAvailable("1 ETH Jackpot", 365 days) && random < 1) {
        lastPrizeTimestamps["1 ETH Jackpot"] = currentTime;
        return "1 ETH Jackpot";
    }
    if (contractBalance >= 14 ether && isPrizeAvailable("0.7 ETH Big Win", 365 days) && random < 1) {
        lastPrizeTimestamps["0.7 ETH Big Win"] = currentTime;
        return "0.7 ETH Big Win";
    }
    if (contractBalance >= 12 ether && isPrizeAvailable("MacBook", 270 days) && random < 2) {
        require(lastPrizeTimestamps["MacBook"] + 270 days <= block.timestamp, "MacBook prize already claimed this period");
        lastPrizeTimestamps["MacBook"] = block.timestamp;
        return "Won MacBook!";
    }
    if (contractBalance >= 11 ether && isPrizeAvailable("iPhone or 0.5 ETH", 180 days) && random < 2) {
        lastPrizeTimestamps["iPhone or 0.5 ETH"] = currentTime;
        return "iPhone or 0.5 ETH";
    }
    if (contractBalance >= 2 ether && isPrizeAvailable("0.1 ETH Monthly Prize", 30 days) && random < 3) {
        lastPrizeTimestamps["0.1 ETH Monthly Prize"] = currentTime;
        return "0.1 ETH Monthly Prize";
    }
    if (contractBalance >= 1.5 ether && isPrizeAvailable("0.05 ETH Monthly Prize", 30 days) && random < 3) {
        lastPrizeTimestamps["0.05 ETH Monthly Prize"] = currentTime;
        return "0.05 ETH Monthly Prize";
    }
    if (contractBalance >= 1 ether && isPrizeAvailable("0.01 ETH Bi-weekly", 14 days) && random < 4) {
        lastPrizeTimestamps["0.01 ETH Bi-weekly"] = currentTime;
        return "0.01 ETH Bi-weekly";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.005 ETH Weekly", 7 days) && random < 4) {
        lastPrizeTimestamps["0.005 ETH Weekly"] = currentTime;
        return "0.005 ETH Weekly";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.001 ETH Five-day Prize", 5 days) && random < 5) {
        lastPrizeTimestamps["0.001 ETH Five-day Prize"] = currentTime;
        return "0.001 ETH Five-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0005 ETH Four-day Prize", 4 days) && random < 6) {
        lastPrizeTimestamps["0.0005 ETH Four-day Prize"] = currentTime;
        return "0.0005 ETH Four-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.000256 ETH Two-day Prize", 2 days) && random < 7) {
        lastPrizeTimestamps["0.000256 ETH Two-day Prize"] = currentTime;
        return "0.000256 ETH Two-day Prize";
    }
    if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0001 ETH Daily Prize", 1 days) && random < 8) {
        lastPrizeTimestamps["0.0001 ETH Daily Prize"] = currentTime;
        return "0.0001 ETH Daily Prize";
    }
    if (contractBalance >= 0.1 ether && isPrizeAvailable("0.00008 ETH Daily Prize", 1 days) && random < 6) {
        if (dailyUsedQuota + 0.00008 ether <= dailyQuota) {
            lastPrizeTimestamps["0.00008 ETH Daily Prize"] = currentTime;
            dailyUsedQuota += 0.00008 ether;
            return "0.00008 ETH Daily Prize";
        }
    }

    // Hadiah 0.00005 ETH (Peluang 0.8%)
    if (contractBalance >= 0.1 ether && isPrizeAvailable("0.00005 ETH Daily Prize", 1 days) && random < 8) {
        if (dailyUsedQuota + 0.00005 ether <= dailyQuota) {
            lastPrizeTimestamps["0.00005 ETH Daily Prize"] = currentTime;
            dailyUsedQuota += 0.00005 ether;
            return "0.00005 ETH Daily Prize";
        }
    }
    if (random < 50) {  
        lPointToken.mint(player, 2 * (10 ** 18));  
        return "Won 2 LPoint";  
    }  
    if (random < 80) {  
        lPointToken.mint(player, 5 * (10 ** 18));  
        return "Won 5 LPoint";  
    }  
    if (random < 95) {  
        lPointToken.mint(player, 7 * (10 ** 18));  
        return "Won 7 LPoint";  

    if (random < 100) {
        return "Try Again";
    }

    return "No Prize";
    }

function isPrizeAvailable(string memory prize, uint256 interval) internal view returns (bool) {
    if (lastPrizeTimestamps[prize] == 0) {
        return true;
    }
    return block.timestamp >= lastPrizeTimestamps[prize] + interval;
}

function resetDailyQuota() internal {
    if (block.timestamp >= lastResetTime + 1 days) {
        dailyUsedQuota = 0;
        lastResetTime = block.timestamp;
    }
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
