console.log("Smartschool Helper: Content & Dark Mode geladen.");

const duidelijkeDarkStyle = `
    body, html, #smscMain, .smsc-container, #content, .js-page-container, #smscContent {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
    }
    .smscHeader, header, .nav-bar, .smsc-topnav, .smsc-menu {
        background-color: #1f1f1f !important;
        border-bottom: 2px solid #333 !important;
    }
    span, h1, h2, h3, h4, th, td, label, p, .smsc-menu-item {
        color: #ffffff !important;
    }
    a { color: #3b82f6 !important; }
    a:hover { color: #60a5fa !important; }
    .smsc-block, .portlet, .card, .smsc-tile, .smscListItem, .block {
        background-color: #1e1e1e !important;
        border: 1px solid #2d2d2d !important;
        border-radius: 8px !important;
    }
    input, textarea, select {
        background-color: #2d2d2d !important;
        color: #ffffff !important;
        border: 1px solid #444 !important;
        border-radius: 4px !important;
    }
    img, .icon, .avatar, [class^="icon-"] { filter: none !important; }
`;

function schakelDarkmodeIn() {
    if (!document.getElementById('helper-darkmode-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'helper-darkmode-styles';
        styleEl.innerHTML = duidelijkeDarkStyle;
        document.head.appendChild(styleEl);
    }
    localStorage.setItem('helper-darkmode', 'aan');
}

function schakelDarkmodeUit() {
    const bestaandeStyle = document.getElementById('helper-darkmode-styles');
    if (bestaandeStyle) bestaandeStyle.remove();
    localStorage.setItem('helper-darkmode', 'uit');
}

if (localStorage.getItem('helper-darkmode') === 'aan') {
    schakelDarkmodeIn();
}

function openOnlineChat() {
    window.open('https://minnit.chat', 'HelperChat', `width=400,height=550,left=${screen.width - 420},top=50,menubar=no,status=no,toolbar=no`);
}

function bouwHelperKnoppen() {
    const header = document.querySelector('.smscHeader') || document.querySelector('.smsc-topnav') || document.querySelector('header');
    if (header) {
        const container = document.createElement('div');
        container.style = 'display:inline-flex; gap:8px; margin-left:20px; align-items:center; z-index:99999; position:relative;';

        const darkBtn = document.createElement('button');
        darkBtn.style = 'padding:6px 12px; border:none; border-radius:4px; cursor:pointer; font-weight:bold; background:#555; color:#fff;';
        darkBtn.innerText = (localStorage.getItem('helper-darkmode') === 'aan') ? "☀️ Light" : "🌙 Dark";
        darkBtn.onclick = () => {
            if (localStorage.getItem('helper-darkmode') === 'aan') { schakelDarkmodeUit(); }
            else { schakelDarkmodeIn(); }
            window.location.reload();
        };

        const chatBtn = document.createElement('button');
        chatBtn.innerText = "💬 Chat";
        chatBtn.style = 'padding:6px 12px; background:#e74c3c; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;';
        chatBtn.onclick = openOnlineChat;

        const gameBtn = document.createElement('button');
        gameBtn.innerText = "🎮 Games & Rad";
        gameBtn.style = 'padding:6px 12px; background:#9b59b6; color:#fff; border:none; border-radius:4px; font-weight:bold; cursor:pointer;';
        // Dit roept de functie aan die dadelijk in games.js staat!
        gameBtn.onclick = openGameCenter;

        container.appendChild(darkBtn);
        container.appendChild(chatBtn);
        container.appendChild(gameBtn);
        header.appendChild(container);
    }
}

setTimeout(bouwHelperKnoppen, 2000);