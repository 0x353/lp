document.getElementById("myModalContainer").innerHTML = `
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('myModal')">&times;</span>
      <h2>Your Bets</h2>
      <div id="userBets"></div>
      <div class="button-container">
        <button class="nav-button" onclick="prevUserBets()">Prev</button>
        <button class="nav-button" onclick="nextUserBets()">Next</button>
      </div>
    </div>
  </div>
`;