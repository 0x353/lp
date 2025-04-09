document.getElementById("walletSection").innerHTML = `
  <center>
    <button id="connectWallet" onclick="connectWallet()">
      <img src="img/connect.svg" alt="Wallet Icon" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">
      Connect Wallet
    </button>  
    <button id="disconnectWallet" onclick="disconnectWallet()" style="display:none;">
      <img src="img/close.svg" alt="Disconnect Icon" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">
      Disconnect
    </button>
  </center>
  <p id="walletAddress" style="display:none; color: #ad5cff"></p>
  <p id="walletBalance" style="display:none; color: #00ca09;">Balance: 0 ETH</p>
  <br>
  <hr style="background-color: #333333; height: 1px; border: none;">
`;