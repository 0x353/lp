const styleTag = document.createElement('style');
styleTag.innerHTML = `
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    text-align: center;
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    font-size: 1rem;
    padding-top: 70px;
}

.container {
    width: 100%;
    max-width: 1250px;
    margin: auto;
    padding: 20px;
    background: #000000;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-sizing: border-box;
    align-items: center;
    margin-top: 20px;
}

@media (max-width: 1024px) {
    body {
        font-size: 0.9rem;
    }
    .container {
        width: 95%;
    }
}

@media (max-width: 768px) {
    body {
        font-size: 0.8rem;
    }
    .container {
        width: 100%;
        padding: 15px;
    }
}

@media (min-width: 1600px) {
    body {
        font-size: 1.2rem;
    }
    .container {
        max-width: 1200px;
    }
}

input {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 90%;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 200, 255, 0.3);
    transition: all 0.4s ease-in-out;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

input:hover {
    background: rgba(0, 0, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 153, 255, 0.8), 
                0 0 25px rgba(0, 153, 255, 0.6), 
                0 0 35px rgba(0, 153, 255, 0.4);
}

button:not(#closePopup) {
    font-size: 0.7em;
    padding: 6px 12px;
    border-radius: 0.7em;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
    transition: all 0.3s ease-in-out;
    font-family: Ubuntu, sans-serif;
}

 .button-container:not(#closePopup) {
    display: flex;
    justify-content: center;
    gap: 20px;
 }

button:not(#closePopup)::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 0.9em;
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    z-index: -1;
    filter: blur(0);
    transition: filter 0.4s ease, opacity 0.4s ease;
    opacity: 1;
}

button:not(#closePopup):hover::before {
    filter: blur(1.2em);
    opacity: 1;
}

button:not(#closePopup):hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

button:not(#closePopup):active {
    transform: scale(0.95);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

button:not(#closePopup):active::before {
    filter: blur(0.2em);
}

button:not(#closePopup)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: transform 0.5s, opacity 0.5s;
}

button:not(#closePopup):active::after {
    transform: translate(-50%, -50%) scale(2);
    opacity: 1;
}

#disconnectWallet {
    background: linear-gradient(135deg, #ff0033, #cc0000);
    box-shadow: 0 0 12px rgba(255, 0, 51, 0.6), 0 0 20px rgba(255, 0, 51, 0.4);
}

#disconnectWallet:hover {
    background: linear-gradient(135deg, #cc0000, #ff0033);
    box-shadow: 0 0 20px rgba(255, 0, 51, 0.9), 0 0 30px rgba(255, 0, 51, 0.7);
}

#walletAddress {
    font-size: 12px;
}

#betHistory, #userBets {
    font-size: 13px;
    text-align: justify;
    hyphens: auto;
    line-height: 1.8;
    max-width: 600px;
    margin: auto;
    padding: 15px;
    text-indent: 20px;
}

table {
    width: 100%;
    max-width: 900px;
    border-collapse: collapse;
    margin: 20px auto;
    font-size: 18px;
    text-align: left;
}

th, td {
    padding: 8px;
    border: 1px solid #ddd;
}

th {
    background-color: #000000;
    background-image: linear-gradient(90deg, #03a9f4, #f441a5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    padding: 10px;
}
        
footer {
        text-align: center;
        margin-top: 20px;
        padding: 10px;
        background: #111;
        color: #ddd;
        font-size: 12px;
    }

    .social-icons {
        margin-bottom: 10px;
    }

    .social-icons a {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15px;
    margin: 0 5px;
    text-decoration: none;
    transition: transform 0.5s ease, text-shadow 0.5s ease, box-shadow 0.5s ease;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
    backdrop-filter: blur(10px);
}

.social-icons a:hover {
    color: #1a88ff;
    text-shadow: 0 0 10px #1a88ff, 0 0 20px #1a88ff, 0 0 30px #1a88ff;
    box-shadow: 0 0 20px rgba(0, 0, 255, 1), 0 0 30px rgba(0, 0, 255, 0.8);
    transform: rotate(360deg);
}

.modal {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
    }

.modal-content {
    background: #111;
    color: white;
    margin: 5% auto;
    padding: 20px;
    width: 80%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 15px rgba(0, 255, 255, 0.5);
}

.close {
  color: white;
  float: right;
  font-size: 24px;
  cursor: pointer;
}
.close:hover {
  color: red;
}

.lottery-table, .history-table {
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
}

.lottery-table th, .history-table th {
    background-color: #000000;
    color: white;
    padding: 10px;
}

.lottery-table td, .history-table td {
    border: 1px solid #000000;
    padding: 10px;
    text-align: center;
    background-color: #000000;
    color: white;
}

.lottery-table td {
    cursor: pointer;
}

.lottery-table td, .history-table td {
    color: #00ca09;
}
        
    #menu {
    position: relative;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 -4px 10px rgba(0, 0, 255, 0.3);
    font-family: Ubuntu, sans-serif;
}

#menu button {
    background: none;
    border: none;
    color: white;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    position: relative;
}

#menu button:hover {
    color: #1a88ff;
    transform: scale(1.1);
}

#menu button::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 3px;
    background: #1a88ff;
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
}

#menu button:hover::before {
    width: 100%;
    left: 0;
}

#menu button img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 255, 0.5)); /* Cahaya biru */
    transition: transform 0.3s ease-in-out;
}

#menu button:hover img {
    transform: rotate(360deg);
}

.modal {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
    background: #111;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    width: 80%;
    max-width: 900px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 15px rgba(0, 255, 255, 0.5);
}

.close {
    color: white;
    float: right;
    font-size: 24px;
    cursor: pointer;
}
.close:hover {
    color: red;
}

.lottery-table, .history-table {
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
}

.lottery-table th, .history-table th {
    background-color: #444;
    color: white;
    padding: 10px;
}

.lottery-table td, .history-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.menu-table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
}

.menu-table tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-table td {
    padding: 10px;
    text-align: left;
    color: #00ca09;
    font-size: 14px;
}

.menu-table img {
    width: 30px;
    height: 30px;
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.8));
}

.menu-table a {
    color: cyan;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s ease-in-out;
}

.menu-table a:hover {
    color: #ff0077;
    text-shadow: 0 0 10px rgba(255, 0, 119, 0.8);
}

h1, h2 {
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h3 {
    color: white;
    font-size: 17px;
    text-shadow: 0px 0px 10px #00aaff, 0px 0px 20px #0088ff;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    padding: 10px 20px;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 1240px;
    z-index: 1000;
    height: 60px;
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 40px;
    margin-right: 10px;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    text-decoration: none;
    color: white;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #00ff66;
}

.hamburger {
    display: none;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.hamburger:hover {
    transform: rotate(90deg) scale(1.2);
    color: #00ff66;
}

@media (max-width: 768px) {
    .hamburger {
        display: block;
    }

    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 0;
        background: #222;
        width: 200px;
        padding: 10px;
        box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease-in-out;
    }

    .nav-links.show {
        display: flex;
        flex-direction: column;
        transform: translateX(0);
        animation: slideIn 0.3s ease-in-out;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.blinking-text {
    color: #e69600;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    animation: blink 3s infinite alternate;
  }

  @keyframes blink {
    0% { opacity: 0.2; text-shadow: 0 0 5px #e69600, 0 0 10px #e69600; }
    50% { opacity: 1; text-shadow: 0 0 10px #e69600, 0 0 20px #e69600; }
    100% { opacity: 0.2; text-shadow: 0 0 5px #e69600, 0 0 10px #e69600; }
  }

  .menu-table img {
    width: 24px;
    height: auto;
    display: block;
    margin: 0 auto;
  }

.popup {
    display: none;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    color: #155724;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.popup.show {
    opacity: 1;
}

#closePopup {
    position: absolute;
    top: 2px;
    right: 5px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    border: none;
    outline: none;
    font-size: 25px;
    color: red;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

#closePopup:focus {
    outline: none;
    box-shadow: none;
}

#notificationIcon {
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 1000;
    display: none;
}

#notificationIcon img {
    width: 30px;
    height: 30px;
}

#notificationBadge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    display: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

#notificationBadge.active {
    display: flex;
}

#notificationList {
    position: fixed;
    top: 60px;
    right: 20px;
    width: 250px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    z-index: 1000;
}

#notificationList ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

#notificationList ul li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

#notificationList ul li:last-child {
    border-bottom: none;
}

#notificationList ul li a {
    text-decoration: none;
    color: #333;
    display: block;
}

#notificationList button {
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0.7em;
    font-size: 15px;
}

#notificationList button:focus,
#notificationList button:active {
    outline: none;
    box-shadow: none;
}

.hidden {
    display: none;
        }

#noNotificationsMessage {
    color: red;
}

.comment-dropdown {
    background: #1a1a1a;
    color: #ccc;
    border-radius: 10px;
    padding: 10px;
    width: 95%;
    max-width: 500px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease-in-out;
}

.comment-dropdown[open] {
    box-shadow: 0px 0px 15px rgba(106, 0, 255, 0.5);
}

.comment-dropdown summary {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}

.comment-dropdown summary img {
    margin-right: 8px;
}

.comment-section {
    padding: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-list {
    max-height: 300px;
    overflow-y: auto;
    padding: 5px;
    border-radius: 5px;
}

textarea {
    width: 95%;
    height: 100px;
    background: #333333;
    border: 1px solid #444;
    color: white;
    padding: 8px;
    border-radius: 5px;
    outline: none;
    display: block;
    margin: 10px auto;
    transition: box-shadow 0.3s, transform 0.2s, border 0.2s;
}

textarea:hover {
    border: 1px solid #00a2ff;
    box-shadow: 4px 4px 10px rgba(0, 162, 255, 0.4), 
                -4px -4px 10px rgba(0, 162, 255, 0.2);
    transform: translateY(-2px);
}

textarea:focus {
    border: 1px solid #00a2ff;
    box-shadow: 6px 6px 14px rgba(0, 162, 255, 0.6), 
                -6px -6px 14px rgba(0, 162, 255, 0.3);
    transform: translateY(-3px);
}

.comment-list p {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 5px 0;
}

.comment-icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.refresh-icon.spin-once {
  animation: spin 2s linear;
}
`;
document.head.appendChild(styleTag);
