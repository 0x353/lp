document.getElementById("bettingSection").innerHTML = `
  <h2>Place Bet</h2>
  <h6 class="blinking-text">Always use slippage to save transaction gas fees!</h6><br>
  <input type="number" id="betNumber" placeholder="4D 3D or 2D" oninput="validateBetNumber()"><br>
  <input type="number" id="betTimes" placeholder="x1 / x99" min="1" max="99" oninput="validateBetTimes(); updateBetPrice()">
  <p id="betWarning" style="color: red;"></p>
  <p id="betPrice" style="color: #00FF66; font-weight: bold;">Cost: 0.000000 ETH</p>
  <button onclick="placeBet()">Place Bet</button>
  <p id="betStatus"></p>
  <br>
`;