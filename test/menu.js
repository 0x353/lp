document.getElementById("menuSection").innerHTML = `
  <div id="menu">
    <button onclick="openModal('menuModal')"><img src="img/pools.svg" alt="Lotto">Pools</button>
    <button onclick="window.open('4d', '_blank')"><img src="img/tools.svg" alt="Lotto">Tool</button>
    <button onclick="openModal('myModal')"><img src="img/mybet.svg" alt="Lotto">MyBets</button>
    <button onclick="openModal('resultModal')"><img src="img/results.svg" alt="Lotto"> Results</button>
    <button onclick="window.open('claim', '_blank')"><img src="img/claim.svg" alt="Lotto" style="width: 28px; height: 28px;">Claim</button>
  </div>
`;