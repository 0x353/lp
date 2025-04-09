document.getElementById("notificationArea").innerHTML = `
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
`;
