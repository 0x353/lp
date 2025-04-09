document.getElementById("menuModalContainer").innerHTML = `
  <div id="menuModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('menuModal')">&times;</span>
      <h2>Menu</h2>
      <table class="menu-table">
        <tr>
          <td><img src="img/hk.svg" alt="HK"></td>
          <td><a href="hk" target="_blank">Hong Kong (HK)</a></td>
        </tr>
        <tr>
          <td><img src="img/sgp.svg" alt="SGP"></td>
          <td><a href="sgp" target="_blank">Singapore (SGP)</a></td>
        </tr>
        <tr>
          <td><img src="img/syd.svg" alt="SYD"></td>
          <td><a href="syd" target="_blank">Sydney (SYD)</a></td>
        </tr>
        <tr>
          <td><img src="img/chi.svg" alt="CHI"></td>
          <td><a href="chi" target="_blank">China (CHI)</a></td>
        </tr>
        <tr>
          <td><img src="img/mc.svg" alt="MC"></td>
          <td><a href="mc" target="_blank">Cambodia (MC)</a></td>
        </tr>
        <tr>
          <td><img src="img/be.svg" alt="BE"></td>
          <td><a href="be" target="_blank">Bull Eye (BE)</a></td>
        </tr>
      </table>
    </div>
  </div>
`;