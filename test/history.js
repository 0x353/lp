document.getElementById("historySection").innerHTML = `
  <h2>Public Bet History</h2>
  <button onclick="window.open('search', '_blank')">
    <img src="img/search.svg" alt="Lotto" style="width: 15px; height: 15px;"> Search...
  </button><br><br>
  <hr style="background-color: #333333; height: 1px; border: none;">
  <div id="betHistoryContainer" style="position: relative;">
    <button id="refreshButton" style="position: absolute; top: 0; right: 0; background: #000000; border: none; cursor: pointer;">
      <img src="img/refresh.svg" class="refresh-icon" style="width: 15px; height: 15px;" />
    </button>
    <div id="betHistory" style="padding-top: 30px;"></div>
  </div>
  <div class="button-container">
    <button class="nav-button" onclick="prevBetHistory()">Prev</button>
    <button class="nav-button" onclick="nextBetHistory()">Next</button>
  </div>
  <br>
`;