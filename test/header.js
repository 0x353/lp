document.getElementById("header").innerHTML = `
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

<div class="container" style="position: relative;">
    <h1>HK Bet DApp</h1>
    <h3>Lotto Chain Decentralizer Betting</h3>
    <br>

    <!-- Notifikasi Popup -->
    <div id="notificationPopup" class="popup hidden" role="alert">
        <button id="closePopup" onclick="closePopup()">×</button>
        <p id="notificationMessage"></p>
    </div>

    <!-- Ikon Notifikasi -->
    <div id="notificationIcon" onclick="toggleNotificationList()" style="position: absolute; top: 10px; right: 10px;">
        <img src="img/bell.svg" alt="Notifications">
        <span id="notificationBadge" class="hidden"></span>
    </div>

    <!-- Daftar Notifikasi -->
    <div id="notificationList" class="hidden" style="position: absolute; top: 40px; right: 10px;">
        <div class="notification-header">
            <p>Notifications</p>
            <ul id="notifications" aria-live="polite"></ul>
            <p id="noNotificationsMessage" class="hidden">No notifications</p>
        </div>
        <button onclick="closeNotificationList()">Close</button>
    </div>
</div>
`;
