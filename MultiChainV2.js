// Definisi ABI untuk setiap chain (contoh sederhana)
const sepoliaBaseABI = [
    {"inputs": [], "name": "getAllBets", "outputs": [{"components": [{"name": "betId", "type": "uint256"}, {"name": "user", "type": "address"}, {"name": "amount", "type": "uint256"}], "name": "", "type": "tuple[]"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"name": "user", "type": "address"}], "name": "winnings", "outputs": [{"name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}
];

const ethMainnetABI = [
    {"inputs": [], "name": "getAllBets", "outputs": [{"components": [{"name": "betId", "type": "uint256"}, {"name": "user", "type": "address"}, {"name": "amount", "type": "uint256"}], "name": "", "type": "tuple[]"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "totalBets", "outputs": [{"name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}
];

const bscTestnetABI = [
    {"inputs": [], "name": "getAllBets", "outputs": [{"components": [{"name": "betId", "type": "uint256"}, {"name": "user", "type": "address"}, {"name": "amount", "type": "uint256"}], "name": "", "type": "tuple[]"}], "stateMutability": "view", "type": "function"}
];

// Definisi chain yang didukung dengan betPrice spesifik
const supportedChains = {
    "sepolia-base": {
        chainId: "0x14a34",
        chainName: "Base Sepolia Testnet",
        rpcUrl: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
        currency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
        contractAddress: "0xA6074b47915d155B5EB097c446fc9d850A4C6E60",
        contractABI: sepoliaBaseABI,
        betPrice: 0.000256 // Harga bet untuk Sepolia Base (dalam ETH)
    },
    "eth-mainnet": {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
        explorerUrl: "https://etherscan.io",
        currency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
        contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
        contractABI: ethMainnetABI,
        betPrice: 0.01 // Harga bet untuk Ethereum Mainnet (dalam ETH, lebih tinggi karena mainnet)
    },
    "bsc-testnet": {
        chainId: "0x61",
        chainName: "Binance Smart Chain Testnet",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        explorerUrl: "https://testnet.bscscan.com",
        currency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
        contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
        contractABI: bscTestnetABI,
        betPrice: 0.001 // Harga bet untuk BSC Testnet (dalam BNB)
    }
};

let web3;
let contract;
let userAccount = null;
let currentChain = "base"; // Tidak ada chain default, akan diperiksa saat koneksi

// **Fungsi untuk memperbarui status jaringan dan harga bet**
function updateNetworkStatus(chainKey = null) {
    const statusElement = document.getElementById("networkStatus");
    const betPriceElement = document.getElementById("betPriceDisplay"); // Elemen untuk menampilkan harga bet
    if (chainKey && supportedChains[chainKey]) {
        statusElement.innerText = `Connected to: ${supportedChains[chainKey].chainName}`;
        statusElement.style.color = "green";
        betPriceElement.innerText = `Bet Price: ${supportedChains[chainKey].betPrice} ${supportedChains[chainKey].currency.symbol}`;
    } else {
        statusElement.innerText = "Not connected to a supported network";
        statusElement.style.color = "red";
        betPriceElement.innerText = "Bet Price: N/A";
    }
}

// **Check Connection on Page Load**
window.addEventListener("load", async () => {
    if (window.ethereum) {
        const savedAccount = localStorage.getItem("walletAddress");
        web3 = new Web3(window.ethereum);

        const currentChainId = await web3.eth.getChainId();
        currentChain = Object.keys(supportedChains).find(key => supportedChains[key].chainId === `0x${currentChainId.toString(16)}`);
        updateNetworkStatus(currentChain);

        if (savedAccount && currentChain) {
            try {
                await switchToChain(currentChain);
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    userAccount = accounts[0];
                    contract = new web3.eth.Contract(
                        supportedChains[currentChain].contractABI,
                        supportedChains[currentChain].contractAddress
                    );

                    document.getElementById("walletAddress").innerText = `Connected: ${userAccount}`;
                    document.getElementById("walletAddress").style.display = "block";
                    document.getElementById("walletBalance").style.display = "block";
                    document.getElementById("connectWallet").style.display = "none";
                    document.getElementById("disconnectWallet").style.display = "block";

                    document.getElementById("notificationIcon").style.display = "block";

                    updateBalance();
                    loadUserBets();
                    loadBetHistory();
                    checkForWinnings();

                    const allBets = await contract.methods.getAllBets().call();
                    const betIds = allBets.map(bet => bet.betId);

                    for (const betId of betIds) {
                        await updateCommentCount(betId);
                        await loadComments(betId);
                    }
                }
            } catch (error) {
                console.error("Auto-connect failed:", error);
                localStorage.removeItem("walletAddress");
            }
        }
    } else {
        alert("MetaMask is not installed!");
        updateNetworkStatus();
    }

    window.ethereum.on("chainChanged", async (chainId) => {
        currentChain = Object.keys(supportedChains).find(key => supportedChains[key].chainId === chainId);
        updateNetworkStatus(currentChain);
        if (userAccount && currentChain) {
            contract = new web3.eth.Contract(
                supportedChains[currentChain].contractABI,
                supportedChains[currentChain].contractAddress
            );
            updateBalance();
            loadUserBets();
            loadBetHistory();
            checkForWinnings();
        }
    });
});

// **Switch to Selected Chain**
async function switchToChain(chainKey) {
    const chain = supportedChains[chainKey];
    try {
        const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

        if (currentChainId !== chain.chainId) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chain.chainId }]
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: chain.chainId,
                            chainName: chain.chainName,
                            nativeCurrency: chain.currency,
                            rpcUrls: [chain.rpcUrl],
                            blockExplorerUrls: [chain.explorerUrl]
                        }]
                    });
                } else {
                    throw switchError;
                }
            }
        }
        currentChain = chainKey;
        contract = new web3.eth.Contract(chain.contractABI, chain.contractAddress);
        updateNetworkStatus(currentChain);
    } catch (error) {
        console.error(`Failed to switch to ${chain.chainName}:`, error);
        alert(`Failed to switch to ${chain.chainName}!`);
        updateNetworkStatus();
    }
}

// **Connect Wallet**
async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            const currentChainId = await web3.eth.getChainId();
            currentChain = Object.keys(supportedChains).find(key => supportedChains[key].chainId === `0x${currentChainId.toString(16)}`);

            if (!currentChain) {
                currentChain = "sepolia-base";
                await switchToChain(currentChain);
            } else {
                await switchToChain(currentChain);
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length === 0) {
                throw new Error("No accounts found. Please connect your wallet.");
            }

            userAccount = accounts[0];
            localStorage.setItem("walletAddress", userAccount);

            const timestamp = new Date().toISOString();
            const message = `Verifying user Connect To Lotto Chain HK Play & Win!\nWallet: ${userAccount}\nTime: ${timestamp}`;
            const signature = await web3.eth.personal.sign(message, userAccount, "");
            console.log("Signature:", signature);

            contract = new web3.eth.Contract(
                supportedChains[currentChain].contractABI,
                supportedChains[currentChain].contractAddress
            );

            document.getElementById("walletAddress").innerText = `Connected: ${userAccount}`;
            document.getElementById("walletAddress").style.display = "block";
            document.getElementById("walletBalance").style.display = "block";
            document.getElementById("connectWallet").style.display = "none";
            document.getElementById("disconnectWallet").style.display = "block";

            document.getElementById("notificationIcon").style.display = "block";

            updateBalance();
            loadUserBets();
            loadBetHistory();
            checkForWinnings();

            const allBets = await contract.methods.getAllBets().call();
            const betIds = allBets.map(bet => bet.betId);

            for (const betId of betIds) {
                await updateCommentCount(betId);
                await loadComments(betId);
            }

        } catch (error) {
            console.error("Connection failed:", error);
            alert(`Connection failed: ${error.message}`);
            updateNetworkStatus();
        }
    } else {
        alert("Please install MetaMask!");
        updateNetworkStatus();
    }
}

// **Fungsi untuk mengganti chain secara manual**
async function changeChain(chainKey) {
    if (supportedChains[chainKey]) {
        await switchToChain(chainKey);
        if (userAccount) {
            contract = new web3.eth.Contract(
                supportedChains[currentChain].contractABI,
                supportedChains[currentChain].contractAddress
            );
            updateBalance();
            loadUserBets();
            loadBetHistory();
            checkForWinnings();
        }
    } else {
        alert("Chain not supported!");
        updateNetworkStatus();
    }
}

// **Disconnect Wallet**
function disconnectWallet() {
    userAccount = null;
    localStorage.removeItem("walletAddress");

    document.getElementById("walletAddress").innerText = "";
    document.getElementById("walletAddress").style.display = "none";
    document.getElementById("walletBalance").innerText = "Balance: 0 ETH";
    document.getElementById("walletBalance").style.display = "none";
    document.getElementById("connectWallet").style.display = "block";
    document.getElementById("disconnectWallet").style.display = "none";

    updateNetworkStatus(currentChain);
}

// **Update Balance**
async function updateBalance() {
    if (userAccount && currentChain) {
        let balanceWei = await web3.eth.getBalance(userAccount);
        let balanceEth = web3.utils.fromWei(balanceWei, "ether");
        document.getElementById("walletBalance").innerText = `Balance: ${parseFloat(balanceEth).toFixed(4)} ${supportedChains[currentChain].currency.symbol}`;
    }
}

// Fungsi lain seperti checkForWinnings(), loadUserBets(), dll. tetap sama

// **Place Bet**
async function placeBet() {
    if (!userAccount) {
        alert("Please connect your wallet first!");
        return;
    }

    if (!currentChain || !supportedChains[currentChain]) {
        alert("Please connect to a supported network!");
        return;
    }

    const number = document.getElementById("betNumber").value;
    const times = parseInt(document.getElementById("betTimes").value);

    // Ambil betPrice dari chain yang aktif
    const betPriceInEther = supportedChains[currentChain].betPrice;
    const betPrice = web3.utils.toWei(betPriceInEther.toString(), "ether"); // Konversi ke wei
    const totalCost = BigInt(betPrice) * BigInt(times); // Gunakan BigInt untuk perhitungan akurat

    if (!number || number.length < 1 || number.length > 4 || isNaN(times) || times < 1) {
        alert("Invalid bet input!");
        return;
    }
    
    try {
        document.getElementById("betStatus").innerHTML = `
            <img src="img/load.svg" width="20" height="20" style="vertical-align: middle;">
            <span style="color: #aaffaa; font-size: 12px;">Transaction in progress...</span>
        `;

        // Estimasi gas sebelum transaksi
        const estimatedGas = await contract.methods.placeBet(number, times, true, 0)
            .estimateGas({ from: userAccount, value: totalCost.toString() });

        await contract.methods.placeBet(number, times, true, 0).send({
            from: userAccount,
            value: totalCost.toString(), // Konversi BigInt ke string untuk Web3.js
            gas: estimatedGas + 50000, // Tambahkan buffer 50.000 untuk keamanan
            maxFeePerGas: web3.utils.toWei("0.0015", "gwei"),  // Gas Fee maksimum
            maxPriorityFeePerGas: web3.utils.toWei("0.0014", "gwei") // Fee Prioritas
        });

        document.getElementById("betStatus").innerHTML = `
            <img src="img/success.svg" width="20" height="20" style="vertical-align: middle;">
            <span style="color: #00cc00; font-size: 12px;">Bet placed successfully!</span>
        `;

        setTimeout(() => {
            document.getElementById("betStatus").innerHTML = "";
        }, 5000);

        loadUserBets();
    } catch (error) {
        console.error(error);

        document.getElementById("betStatus").innerHTML = `
            <img src="img/failed.svg" width="20" height="20" style="vertical-align: middle;">
            <span style="color: #ff3333; font-size: 12px;">Transaction failed!</span>
        `;

        setTimeout(() => {
            document.getElementById("betStatus").innerHTML = "";
        }, 4000);
    }
}


html:

<div id="networkStatus" style="font-weight: bold;">Not connected to a supported network</div>
<div id="betPriceDisplay" style="font-weight: bold;">Bet Price: N/A</div>
<div id="walletAddress" style="display: none;"></div>
<div id="walletBalance" style="display: none;">Balance: 0 ETH</div>
<button id="connectWallet" onclick="connectWallet()">Connect Wallet</button>
<button id="disconnectWallet" onclick="disconnectWallet()" style="display: none;">Disconnect</button>
<select id="chainSelector" onchange="changeChain(this.value)">
    <option value="sepolia-base">Sepolia Base Testnet</option>
    <option value="eth-mainnet">Ethereum Mainnet</option>
    <option value="bsc-testnet">BSC Testnet</option>
</select>
<div id="notificationIcon" style="display: none;">🔔</div>
