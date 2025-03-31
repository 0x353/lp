// SPDX-License-Identifier: MIT pragma solidity ^0.8.19;

contract SpinBet {
struct Bet {
    address player;         // Alamat pemain
    uint256 amount;         // Jumlah taruhan
    string result;          // Hasil taruhan (prize)
    uint256 timestamp;      // Waktu taruhan
    uint256 randomNumber;   // Nomor acak yang digunakan
    uint256 contractBalance; // Saldo kontrak saat taruhan
    uint256 playerBetCount;  // Total taruhan pemain sebelumnya
    uint256 totalBets;       // Total taruhan dalam kontrak
    string highestAvailablePrize; // Hadiah terbesar yang bisa dimenangkan saat itu
    bool prizeAvailable;     // Status hadiah (tersedia atau tidak)
    uint256 winChance;       // Persentase peluang menang
    LPointToken public lpointToken;
}

mapping(address => Bet[]) private userBets;
Bet[] public publicBets;
uint256 public publicHistoryLimit = 50;
uint256 public spinPrice = 0.000256 ether;
uint256 public dailyQuota = 0.01 ether;
uint256 public dailyUsedQuota = 0;
uint256 public lastResetTime;
address public owner;
mapping(string => uint256) public lastPrizeTimestamps;
mapping(address => Bet[]) public userBets;  // Menyimpan riwayat taruhan setiap pemain
Bet[] public publicBets;                    // Menyimpan riwayat taruhan publik
uint256 public publicHistoryLimit = 100;    // Batas maksimal riwayat taruhan publik

event BetPlaced(
    address indexed player,
    uint256 amount,
    string result,
    uint256 timestamp,
    uint256 randomNumber,
    uint256 contractBalance,
    uint256 playerBetCount,
    uint256 totalBets,
    string highestAvailablePrize,
    bool prizeAvailable,
    uint256 winChance
);

event LPointAwarded(address indexed player, uint256 amount);

constructor(address _lpointAddress) {
        owner = msg.sender;
        lpointToken = LPointToken(_lpointAddress);
    }

modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
}

function placeBet() public payable {
    require(msg.value == spinPrice, "Incorrect ETH amount");
    resetDailyQuota();

    uint256 contractBalance = address(this).balance;
    uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 1000;
    string memory result = determinePrize();
    uint256 playerBetCount = userBets[msg.sender].length;
    uint256 totalBets = publicBets.length + 1;
    string memory highestAvailablePrize = getHighestAvailablePrize();
    bool prizeAvailable = isPrizeAvailable(result, 0);
    uint256 winChance = getWinChance(result);

uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 1000;
        if (random < 600) {
            distributeLPoint(msg.sender, 2 * 10**18);
        } else if (random < 800) {
            distributeLPoint(msg.sender, 5 * 10**18);
        } else if (random < 900) {
            distributeLPoint(msg.sender, 7 * 10**18);
        }
    }

    Bet memory newBet = Bet(
        msg.sender,
        msg.value,
        result,
        block.timestamp,
        randomNumber,
        contractBalance,
        playerBetCount,
        totalBets,
        highestAvailablePrize,
        prizeAvailable,
        winChance
    );

    userBets[msg.sender].push(newBet);
    publicBets.push(newBet);

    if (publicBets.length > publicHistoryLimit) {
        for (uint256 i = 0; i < publicBets.length - 1; i++) {
            publicBets[i] = publicBets[i + 1];
        }
        publicBets.pop();
    }

    emit BetPlaced(
        msg.sender,
        msg.value,
        result,
        block.timestamp,
        randomNumber,
        contractBalance,
        playerBetCount,
        totalBets,
        highestAvailablePrize,
        prizeAvailable,
        winChance
    );
}

function getHighestAvailablePrize() internal view returns (string memory) {
    if (address(this).balance >= 15 ether) return "1 ETH Jackpot";
    if (address(this).balance >= 14 ether) return "0.7 ETH Big Win";
    if (address(this).balance >= 12 ether) return "MacBook";
    if (address(this).balance >= 11 ether) return "iPhone or 0.5 ETH";
    if (address(this).balance >= 2 ether) return "0.1 ETH Monthly Prize";
    return "Small Prize Available";
}

function getWinChance(string memory result) internal pure returns (uint256) {
    if (keccak256(bytes(result)) == keccak256(bytes("1 ETH Jackpot"))) return 0.1;
    if (keccak256(bytes(result)) == keccak256(bytes("0.7 ETH Big Win"))) return 0.2;
    if (keccak256(bytes(result)) == keccak256(bytes("MacBook"))) return 0.5;
    if (keccak256(bytes(result)) == keccak256(bytes("iPhone or 0.5 ETH"))) return 1;
    if (keccak256(bytes(result)) == keccak256(bytes("0.1 ETH Monthly Prize"))) return 2;
    return 10; // Hadiah kecil atau biasa
}

function determinePrize() internal returns (string memory) {
    uint256 contractBalance = address(this).balance;
    uint256 currentTime = block.timestamp;
    uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 1000;

    function determinePrize() internal returns (string memory) { uint256 contractBalance = address(this).balance; uint256 currentTime = block.timestamp; uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 1000;

if (contractBalance >= 15 ether && isPrizeAvailable("1 ETH Jackpot", 365 days) && random < 1) {
    lastPrizeTimestamps["1 ETH Jackpot"] = currentTime;
    return "1 ETH Jackpot";
}
if (contractBalance >= 14 ether && isPrizeAvailable("0.7 ETH Big Win", 365 days) && random < 2) {
    lastPrizeTimestamps["0.7 ETH Big Win"] = currentTime;
    return "0.7 ETH Big Win";
}
if (contractBalance >= 12 ether && isPrizeAvailable("MacBook", 270 days) && random < 5) {
    lastPrizeTimestamps["MacBook"] = currentTime;
    return "Won MacBook!";
}
if (contractBalance >= 11 ether && isPrizeAvailable("iPhone or 0.5 ETH", 180 days) && random < 10) {
    lastPrizeTimestamps["iPhone or 0.5 ETH"] = currentTime;
    return "iPhone or 0.5 ETH";
}
if (contractBalance >= 2 ether && isPrizeAvailable("0.1 ETH Monthly Prize", 30 days) && random < 20) {
    lastPrizeTimestamps["0.1 ETH Monthly Prize"] = currentTime;
    return "0.1 ETH Monthly Prize";
}
if (contractBalance >= 1.5 ether && isPrizeAvailable("0.05 ETH Monthly Prize", 30 days) && random < 30) {
    lastPrizeTimestamps["0.05 ETH Monthly Prize"] = currentTime;
    return "0.05 ETH Monthly Prize";
}
if (contractBalance >= 1 ether && isPrizeAvailable("0.01 ETH Bi-weekly", 14 days) && random < 50) {
    lastPrizeTimestamps["0.01 ETH Bi-weekly"] = currentTime;
    return "0.01 ETH Bi-weekly";
}
if (contractBalance >= 0.5 ether && isPrizeAvailable("0.005 ETH Weekly", 7 days) && random < 80) {
    lastPrizeTimestamps["0.005 ETH Weekly"] = currentTime;
    return "0.005 ETH Weekly";
}
if (contractBalance >= 0.5 ether && isPrizeAvailable("0.001 ETH Five-day Prize", 5 days) && random < 100) {
    lastPrizeTimestamps["0.001 ETH Five-day Prize"] = currentTime;
    return "0.001 ETH Five-day Prize";
}
if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0005 ETH Four-day Prize", 4 days) && random < 150) {
    lastPrizeTimestamps["0.0005 ETH Four-day Prize"] = currentTime;
    return "0.0005 ETH Four-day Prize";
}
if (contractBalance >= 0.5 ether && isPrizeAvailable("0.000256 ETH Two-day Prize", 2 days) && random < 200) {
    lastPrizeTimestamps["0.000256 ETH Two-day Prize"] = currentTime;
    return "0.000256 ETH Two-day Prize";
}
if (contractBalance >= 0.5 ether && isPrizeAvailable("0.0001 ETH Daily Prize", 1 days) && random < 250) {
    lastPrizeTimestamps["0.0001 ETH Daily Prize"] = currentTime;
    return "0.0001 ETH Daily Prize";
}
if (contractBalance >= 0.1 ether && isPrizeAvailable("0.00008 ETH Daily Prize", 1 days) && random < 300) {
    return "0.00008 ETH Daily Prize";
}
if (contractBalance >= 0.1 ether && isPrizeAvailable("0.00005 ETH Daily Prize", 1 days) && random < 400) {
    return "0.00005 ETH Daily Prize";
}
if (random < 600) {
    return "Won 2 LPoint";
}
if (random < 800) {
    return "Won 5 LPoint";
}
if (random < 900) {
    return "Won 7 LPoint";
}
if (random >= 900 && random < 950) {
    return "Try Again";
}
return "Try Again";  // Default jika tidak ada hadiah lain yang cocok

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

function distributeLPoint(address player, uint256 amount) internal {
        require(lpointToken.balanceOf(address(this)) >= amount, "Not enough LPoint in contract");
        lpointToken.transfer(player, amount);
        emit LPointAwarded(player, amount);
    }

    function depositLPoint(uint256 amount) external {
        require(lpointToken.transferFrom(msg.sender, address(this), amount), "Deposit failed");
    }

    function withdrawLPoint(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(lpointToken.transfer(owner, amount), "Withdraw failed");
    }
}

function getPublicBets() public view returns (Bet[] memory) {
    return publicBets;
}

function withdraw(uint256 amount) public onlyOwner {
    require(amount <= address(this).balance, "Insufficient contract balance");
    payable(owner).transfer(amount);
}

}

