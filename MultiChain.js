// Definisi ABI untuk setiap chain (jika berbeda)
const sepoliaBaseABI = [
    {
        "inputs": [],
        "name": "getAllBets",
        "outputs": [
            {
                "components": [
                    {"name": "betId", "type": "uint256"},
                    {"name": "user", "type": "address"},
                    {"name": "amount", "type": "uint256"}
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "winnings",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
    // Tambahkan fungsi lain sesuai kontrak Anda
];

const ethMainnetABI = [
    {
        "inputs": [],
        "name": "getAllBets",
        "outputs": [
            {
                "components": [
                    {"name": "betId", "type": "uint256"},
                    {"name": "user", "type": "address"},
                    {"name": "amount", "type": "uint256"}
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    // ABI bisa berbeda jika kontrak di Mainnet memiliki fungsi tambahan
    {
        "inputs": [],
        "name": "totalBets",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

const bscTestnetABI = [
    {
        "inputs": [],
        "name": "getAllBets",
        "outputs": [
            {
                "components": [
                    {"name": "betId", "type": "uint256"},
                    {"name": "user", "type": "address"},
                    {"name": "amount", "type": "uint256"}
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    // ABI bisa disesuaikan jika kontrak di BSC Testnet berbeda
];

// Definisi chain yang didukung dengan ABI dan alamat kontrak
const supportedChains = {
    "sepolia-base": {
        chainId: "0x14a34", // Sepolia Base Testnet
        chainName: "Base Sepolia Testnet",
        rpcUrl: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
        currency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
        contractAddress: "0xA6074b47915d155B5EB097c446fc9d850A4C6E60",
        contractABI: sepoliaBaseABI
    },
    "eth-mainnet": {
        chainId: "0x1", // Ethereum Mainnet
        chainName: "Ethereum Mainnet",
        rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
        explorerUrl: "https://etherscan.io",
        currency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
        contractAddress: "0x1234567890abcdef1234567890abcdef12345678", // Ganti dengan alamat kontrak di Mainnet
        contractABI: ethMainnetABI
    },
    "bsc-testnet": {
        chainId: "0x61", // BSC Testnet
        chainName: "Binance Smart Chain Testnet",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        explorerUrl: "https://testnet.bscscan.com",
        currency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
        contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12", // Ganti dengan alamat kontrak di BSC Testnet
        contractABI: bscTestnetABI
    }
};

const betPrice = 0.000256;

let web3;
let contract;
let userAccount = null;
let currentChain = "sepolia-base"; // Chain default

// **Check Connection on Page Load**
window.addEventListener("load", async () => {
    if (window.ethereum) {
        const savedAccount = localStorage.getItem("walletAddress");
        if (savedAccount) {
            try {
                web3 = new Web3(window.ethereum);
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
    }
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
        contract = new web3.eth.Contract(chain.contractABI, chain.contractAddress); // Gunakan ABI dan alamat kontrak chain ini
    } catch (error) {
        console.error(`Failed to switch to ${chain.chainName}:`, error);
        alert(`Failed to switch to ${chain.chainName}!`);
    }
}

// **Connect Wallet**
async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await switchToChain(currentChain);

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
        }
    } else {
        alert("Please install MetaMask!");
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
}

// **Update Balance**
async function updateBalance() {
    if (userAccount) {
        let balanceWei = await web3.eth.getBalance(userAccount);
        let balanceEth = web3.utils.fromWei(balanceWei, "ether");
        document.getElementById("walletBalance").innerText = `Balance: ${parseFloat(balanceEth).toFixed(4)} ${supportedChains[currentChain].currency.symbol}`;
    }
}

// Fungsi lain seperti checkForWinnings(), loadUserBets(), dll. tetap sama
