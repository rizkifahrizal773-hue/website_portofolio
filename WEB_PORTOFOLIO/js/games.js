// ==========================================
// CYBER GAMES COLLECTION
// Modern Version - games.js
// ==========================================

function openGame(gameId) {
    const modal = document.getElementById("game-modal");
    const container = document.getElementById("game-container");

    modal.style.display = "flex";
    container.innerHTML = "";

    switch (gameId) {
        case "typist":
            initTypist(container);
            break;

        case "cracker":
            initCracker(container);
            break;

        case "firewall":
            initFirewall(container);
            break;

        default:
            container.innerHTML = `
                <h2 style="color:red;">Game Not Found</h2>
            `;
    }
}

// ==========================================
// Escape HTML
// ==========================================
function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// ==========================================
// GAME 1 : TERMINAL TYPIST
// ==========================================
function initTypist(container) {

    container.innerHTML = `
        <div class="cyber-game">
            <h2 class="game-title">⌨ TERMINAL TYPIST</h2>

            <div class="game-topbar">
                <span>Score: <b id="typist-score">0</b></span>
                <span>Lives: <b id="typist-lives">3</b></span>
            </div>

            <div id="typist-area" class="typist-area"></div>

            <input
                type="text"
                id="typist-input"
                placeholder="Type incoming command..."
                autocomplete="off"
            >

            <p id="typist-message"></p>
        </div>
    `;

    const words = [
        "sudo",
        "encrypt",
        "proxy",
        "firewall",
        "server",
        "linux",
        "malware",
        "packet",
        "terminal",
        "network",
        "cyber",
        "exploit",
        "scanner",
        "database",
        "admin",
        "trojan"
    ];

    const area = document.getElementById("typist-area");
    const input = document.getElementById("typist-input");
    const scoreEl = document.getElementById("typist-score");
    const livesEl = document.getElementById("typist-lives");
    const msgEl = document.getElementById("typist-message");

    let activeWords = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;

    input.focus();

    function spawnWord() {

        if (gameOver) return;

        const text = words[Math.floor(Math.random() * words.length)];

        const el = document.createElement("div");

        el.className = "falling-word";
        el.innerText = text;

        el.style.left =
            Math.random() * (area.clientWidth - 120) + "px";

        area.appendChild(el);

        activeWords.push({
            text,
            el,
            y: 0,
            speed: 1 + Math.random() * 2
        });
    }

    function updateWords() {

        if (gameOver) return;

        for (let i = activeWords.length - 1; i >= 0; i--) {

            const word = activeWords[i];

            word.y += word.speed;

            word.el.style.top = word.y + "px";

            if (word.y > area.clientHeight - 40) {

                area.removeChild(word.el);

                activeWords.splice(i, 1);

                lives--;

                livesEl.innerText = lives;

                shakeScreen();

                if (lives <= 0) {
                    endGame();
                }
            }
        }
    }

    function endGame() {

        gameOver = true;

        clearInterval(loop);

        input.disabled = true;

        msgEl.innerHTML = `
            ⚠ SYSTEM BREACHED ⚠ <br>
            Final Score : ${score}
        `;
    }

    function shakeScreen() {

        area.classList.add("shake");

        setTimeout(() => {
            area.classList.remove("shake");
        }, 300);
    }

    input.addEventListener("input", (e) => {

        const value =
            escapeHtml(e.target.value.trim().toLowerCase());

        for (let i = 0; i < activeWords.length; i++) {

            if (activeWords[i].text === value) {

                area.removeChild(activeWords[i].el);

                activeWords.splice(i, 1);

                score += 10;

                scoreEl.innerText = score;

                e.target.value = "";

                break;
            }
        }
    });

    const loop = setInterval(() => {

        updateWords();

        if (Math.random() < 0.04) {
            spawnWord();
        }

    }, 30);
}

// ==========================================
// GAME 2 : PASSWORD CRACKER
// ==========================================
function initCracker(container) {

    const secret = Math.floor(Math.random() * 900) + 100;

    let attempts = 0;

    container.innerHTML = `
        <div class="cyber-game">

            <h2 class="game-title">🔓 PASSWORD CRACKER</h2>

            <p class="game-desc">
                Guess the secret 3 digit password
            </p>

            <div class="cracker-box">

                <input
                    type="number"
                    id="cracker-input"
                    min="100"
                    max="999"
                    placeholder="Enter Password"
                >

                <button id="cracker-btn">
                    Crack
                </button>

            </div>

            <div id="cracker-status"></div>

            <div id="cracker-log" class="terminal-log"></div>

        </div>
    `;

    const input = document.getElementById("cracker-input");
    const btn = document.getElementById("cracker-btn");
    const log = document.getElementById("cracker-log");
    const status = document.getElementById("cracker-status");

    btn.addEventListener("click", () => {

        const guess = parseInt(input.value);

        if (isNaN(guess)) return;

        attempts++;

        let message = "";

        if (guess === secret) {

            status.innerHTML = `
                <span style="color:#00ff66;">
                    ACCESS GRANTED
                </span>
            `;

            message = `[${attempts}] ${guess} ✔ CORRECT`;

            btn.disabled = true;
            input.disabled = true;

        } else if (guess < secret) {

            message = `[${attempts}] ${guess} TOO LOW`;

            status.innerHTML = `
                <span style="color:orange;">
                    SIGNAL TOO WEAK
                </span>
            `;

        } else {

            message = `[${attempts}] ${guess} TOO HIGH`;

            status.innerHTML = `
                <span style="color:red;">
                    SECURITY ALERT
                </span>
            `;
        }

        log.innerHTML += `
            <div>${message}</div>
        `;

        log.scrollTop = log.scrollHeight;

        input.value = "";
    });
}

// ==========================================
// GAME 3 : FIREWALL DEFENSE
// ==========================================
function initFirewall(container) {

    container.innerHTML = `
        <div class="cyber-game">

            <h2 class="game-title">🛡 FIREWALL DEFENSE</h2>

            <p>
                Destroy incoming threats before they hit the core
            </p>

            <div class="game-topbar">
                <span>Score: <b id="fw-score">0</b></span>
            </div>

            <div id="fw-area" class="firewall-area">

                <div class="core"></div>

            </div>

            <p id="fw-message"></p>

        </div>
    `;

    const area = document.getElementById("fw-area");
    const scoreEl = document.getElementById("fw-score");
    const msgEl = document.getElementById("fw-message");

    let packets = [];
    let score = 0;
    let gameOver = false;

    function spawnPacket() {

        if (gameOver) return;

        const packet = document.createElement("div");

        packet.className = "packet";

        const angle = Math.random() * Math.PI * 2;

        const radius = 170;

        let x = 180 + Math.cos(angle) * radius;
        let y = 180 + Math.sin(angle) * radius;

        packet.style.left = x + "px";
        packet.style.top = y + "px";

        area.appendChild(packet);

        const obj = { packet, x, y, angle };

        packets.push(obj);

        packet.onclick = () => {

            if (gameOver) return;

            packet.classList.add("explode");

            setTimeout(() => {

                if (packet.parentNode) {
                    packet.remove();
                }

            }, 200);

            packets = packets.filter(p => p !== obj);

            score++;

            scoreEl.innerText = score;
        };
    }

    function updatePackets() {

        if (gameOver) return;

        for (let i = packets.length - 1; i >= 0; i--) {

            const p = packets[i];

            p.x -= Math.cos(p.angle) * 1.7;
            p.y -= Math.sin(p.angle) * 1.7;

            p.packet.style.left = p.x + "px";
            p.packet.style.top = p.y + "px";

            const dist = Math.hypot(p.x - 180, p.y - 180);

            if (dist < 25) {

                gameOver = true;

                clearInterval(loop);

                msgEl.innerHTML = `
                    ☠ CORE BREACHED ☠ <br>
                    Final Score : ${score}
                `;
            }
        }
    }

    const loop = setInterval(() => {

        updatePackets();

        if (Math.random() < 0.05) {
            spawnPacket();
        }

    }, 30);
}