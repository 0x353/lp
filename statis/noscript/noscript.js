document.getElementById("noScript").innerHTML = `
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
        <li><a href="#features">4D Pools</a></li>
        <li><a href="#prizes">Prizes</a></li>
        <li><a href="lottery">LottoBalls (LB)</a></li>
        <li><a href="hk">Hong Kong (HK)</a></li>
        <li><a href="syd">Sydney (SYD)</a></li>
    </ul>
</nav>
    
   <div class="container">
        <h1>HK Bet DApp</h1>
        <h3>Lotto Chain Decentralizer Betting</h3>
        <br>

<div id="notificationPopup" class="popup hidden" role="alert">
    <button id="closePopup" onclick="closePopup()">×</button>
    <p id="notificationMessage"></p>
</div>

<div id="notificationIcon" onclick="toggleNotificationList()">
    <img src="img/bell.svg" alt="Notifications">
    <span id="notificationBadge" class="hidden"></span>
</div>

<div id="notificationList" class="hidden">
    <div class="notification-header">
        <p>Notifications</p>
        <ul id="notifications" aria-live="polite"></ul>
        <p id="noNotificationsMessage" class="hidden">No notifications</p>
    </div>
    <button onclick="closeNotificationList()">Close</button>
</div>

<center><button id="connectWallet" onclick="connectWallet()"><img src="img/connect.svg" alt="Wallet Icon" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">Connect Wallet</button>  
        <button id="disconnectWallet" onclick="disconnectWallet()" style="display:none;"><img src="img/close.svg" alt="Disconnect Icon" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">Disconnect</button>
        </center>
        <p id="walletAddress" style="display:none; color: #ad5cff"></p>
        <p id="walletBalance" style="display:none; color: #00ca09;">Balance: 0 ETH</p><br>
        <hr style="background-color: #333333; height: 1px; border: none;">
        <h2>Place Bet</h2>
        <h6 class="blinking-text">Always use slippage to save transaction gas fees!</h6><br>
        <input type="number" id="betNumber" placeholder="4D 3D or 2D" oninput="validateBetNumber()"><br>
        <input type="number" id="betTimes" placeholder="x1 / x99" min="1" max="99" oninput="validateBetTimes(); updateBetPrice()">
        <p id="betWarning" style="color: red;"></p>
        <p id="betPrice" style="color: #00FF66; font-weight: bold;">Cost: 0.000000 ETH</p>
        <button onclick="placeBet()">Submit Ticket</button>
        <p id="betStatus"></p>
       <br>
       <h2>Public Bet History</h2>
       <button onclick="window.open('search', '_blank')"><img src="img/search.svg" alt="Lotto" style="width: 15px; height: 15px;">  Search...</button><br><br>
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

        <div id="prizes" class="section-box">
        <center><h2>4D ETH Prize Payouts</h2></center>
            <table>
                <tr>
                    <th>Bet Type</th>
                    <th>Prize Multiplier</th>
                    <th>Example (0.000256 ETH)</th>
                </tr>
                <tr>
                    <td style="color: orange; font-weight: bold;">4D</td>
                    <td style="color: #00ca09; font-weight: bold;">50,000%</td>
                    <td style="color: #1a88ff; font-weight: bold;">0.128 ETH</td>
                </tr>
                <tr>
                    <td style="color: orange; font-weight: bold;">3D</td>
                    <td style="color: #00ca09; font-weight: bold;">5,000%</td>
                    <td style="color: #1a88ff; font-weight: bold;">0.0128 ETH</td>
                </tr>
                <tr>
                    <td style="color: orange; font-weight: bold;">2D</td>
                    <td style="color: #00ca09; font-weight: bold;">500%</td>
                    <td style="color: #1a88ff; font-weight: bold;">0.00128 ETH</td>
                </tr>
            </table>
        </div>

        <div id="menu">
    <button onclick="openModal('menuModal')"><img src="img/pools.svg" alt="Lotto">Pools</button>
    <button onclick="window.open('4d', '_blank')"><img src="img/tools.svg" alt="Lotto">Tools</button>
    <button onclick="openModal('myModal')"><img src="img/mybet.svg" alt="Lotto">Ticket</button>
    <button onclick="openModal('resultModal')"><img src="img/results.svg" alt="Lotto"> Results</button>
    <button onclick="window.open('claim', '_blank')"><img src="img/claim.svg" alt="Lotto" style="width: 28px; height: 28px;">Claim</button>
</div> <!-- Penutupan <div> harus ada di sini -->
       
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

<div id="resultModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal('resultModal')">&times;</span>
        <h2>Hong Kong (HK) Results Today</h2>
        <br>

        <table class="lottery-table">
            <thead>
                <tr>
                    <th style="color: #ffffff;">4D</th>
                    <th style="color: #ffffff;">3D</th>
                    <th style="color: #ffffff;">2D></th>
                    <th style="color: #ffffff;">2D</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td contenteditable="true">12</td>
                    <td contenteditable="true">34</td>
                    <td contenteditable="true">56</td>
                    <td contenteditable="true">78</td>
                </tr>
            </tbody>
        </table>
        <br>

    <h3>History (Last 7 Days)</h3>
        <br>
        <table class="history-table">
            <thead>
                <tr>
                    <th style="color: #ffffff;">Date</th>
                    <th style="color: #ffffff;">4D</th>
                    <th style="color: #ffffff;">3D</th>
                    <th style="color: #ffffff;">2D></th>
                    <th style="color: #ffffff;">2D</th>
                </tr>
            </thead>
            <tbody id="historyBody">
                <tr>
                    <td style="color: orange;">2024-10-01</td>
                    <td>11</td>
                    <td>22</td>
                    <td>33</td>
                    <td>44</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-30</td>
                    <td>55</td>
                    <td>66</td>
                    <td>77</td>
                    <td>88</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-29</td>
                    <td>12</td>
                    <td>23</td>
                    <td>34</td>
                    <td>45</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-28</td>
                    <td>67</td>
                    <td>78</td>
                    <td>89</td>
                    <td>90</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-27</td>
                    <td>10</td>
                    <td>20</td>
                    <td>30</td>
                    <td>40</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-26</td>
                    <td>13</td>
                    <td>24</td>
                    <td>35</td>
                    <td>46</td>
                </tr>
                <tr>
                    <td style="color: orange;">2024-09-25</td>
                    <td>99</td>
                    <td>88</td>
                    <td>77</td>
                    <td>66</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

    <footer>
    <div class="social-icons">
        <a href="https://twitter.com/" target="_blank"><i class="fa-brands fa-twitter"></i></a>
        <a href="https://t.me/" target="_blank"><i class="fa-brands fa-telegram"></i></a>
        <a href="" target="_blank"><i class="fa-brands fa-discord"></i></a>
        <a href="" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        <a href="" target="_blank"><i class="fa-brands fa-youtube"></i></a>
    </div>
    <p>© 2025 Powered By Lotto Chain. All rights reserved. Play responsibly.</p>
</footer>
`;
