document.getElementById("navbar").innerHTML = `
<nav class="navbar">
  <div class="logo">
    <img src="img/logo.svg" alt="Lotto Chain Logo" class="logo-img">
    <span style="
      font-size: 22px; 
      font-weight: bold; 
      background: linear-gradient(90deg, #03a9f4, #f441a5); 
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent;
      display: inline-block;
    ">
      Lotto Chain
    </span>
  </div>
  <div class="hamburger" onclick="toggleMenu()">&#9776;</div>
  <ul class="nav-links" id="navMenu">
    <a href="#features">4D Pools</a>
    <a href="#prizes">Prizes</a>
    <a href="lottery">LottoBalls (LB)</a>
    <a href="hk">Hong Kong (HK)</a>
    <a href="syd">Sydney (SYD)</a>
  </ul>
</nav>
`;