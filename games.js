console.log("Smartschool Helper: Games engine geladen.");

function openGameCenter() {
    const gameHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Smartschool Game Center</title>
        <style>
            body { background: #222; color: #fff; font-family: sans-serif; text-align: center; padding: 10px; margin: 0; }
            button { padding: 6px 12px; font-weight: bold; cursor: pointer; border: none; border-radius: 4px; margin: 5px; }
            .btn-snake { background: #2ecc71; color: #fff; }
            .btn-wheel { background: #f1c40f; color: #000; }
            .btn-spin { background: #e74c3c; color: #fff; width: 80%; padding: 8px; font-size: 14px; }
            .game-area { background: #111; border-radius: 6px; padding: 15px; min-height: 340px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 10px; }
            canvas { background: #000; border: 2px solid #fff; }
            .grid-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 90%; margin-top: 10px; }
            .grid-inputs input { padding: 4px; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <h2>🎮 Smartschool Game Center</h2>
        <button class="btn-snake" onclick="startSnake()">🐍 Speel Snake</button>
        <button class="btn-wheel" onclick="startWheel()">🎡 Het Rad (Max 8)</button>
        <div class="game-area" id="area"></div>

        <script>
            const area = document.getElementById("area");
            let snakeTimer;

            function startSnake() {
                clearInterval(snakeTimer);
                area.innerHTML = '<canvas id="sCanvas" width="270" height="270"></canvas><p style="font-size:12px; color:#aaa; margin:5px 0 0 0;">Stuur met de kleine pijltjestoetsen!</p>';
                const canvas = document.getElementById("sCanvas"); const ctx = canvas.getContext("2d");
                let box = 15; let snake = [{x: 9*box, y: 9*box}];
                let food = {x: Math.floor(Math.random()*18)*box, y: Math.floor(Math.random()*18)*box};
                let d = "RIGHT";

                window.onkeydown = (e) => {
                    const pijltjes =;
                    if(pijltjes.indexOf(e.keyCode) > -1) e.preventDefault();
                    if(e.keyCode == 37 && d != "RIGHT") d = "LEFT";
                    if(e.keyCode == 38 && d != "DOWN") d = "UP";
                    if(e.keyCode == 39 && d != "LEFT") d = "RIGHT";
                    if(e.keyCode == 40 && d != "UP") d = "DOWN";
                };

                snakeTimer = setInterval(() => {
                    ctx.fillStyle = "#000"; ctx.fillRect(0,0,270,270);
                    for(let i=0; i<snake.length; i++) {
                        ctx.fillStyle = (i==0) ? "#2ecc71" : "#27ae60";
                        ctx.fillRect(snake[i].x, snake[i].y, box, box);
                    }
                    ctx.fillStyle = "#ff4444"; ctx.fillRect(food.x, food.y, box, box);

                    let sX = snake[i=0].x; let sY = snake[i=0].y;
                    if(d == "LEFT") sX -= box; if(d == "UP") sY -= box;
                    if(d == "RIGHT") sX += box; if(d == "DOWN") sY += box;

                    if(sX == food.x && sY == food.y) {
                        food = {x: Math.floor(Math.random()*18)*box, y: Math.floor(Math.random()*18)*box};
                    } else { snake.pop(); }

                    let head = {x: sX, y: sY};
                    if(sX < 0 || sX >= 270 || sY < 0 || sY >= 270 || snake.some(t => t.x == head.x && t.y == head.y)) {
                        clearInterval(snakeTimer);
                        area.innerHTML = '<h3 style="color:#ff4444; margin:0;">Game Over!</h3><button class="btn-snake" onclick="startSnake()">Opnieuw</button>';
                    }
                    snake.unshift(head);
                }, 130);
            }

            function startWheel() {
                clearInterval(snakeTimer);
                area.innerHTML = \`
                    <div style="position:relative; width:200px; height:200px; margin-bottom:8px;">
                        <div style="width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:14px solid #ff4444; position:absolute; top:-4px; left:92px; z-index:10;"></div>
                        <canvas id="wCanvas" width="200" height="200" style="border-radius:50%;"></canvas>
                    </div>
                    <button class="btn-spin" id="spinBtn">🔥 DRAAIEN</button>
                    <h4 id="res" style="color:#ffcc00; margin:5px 0;">Resultaat: ...</h4>
                    <div class="grid-inputs" id="inCont"></div>
                \`;

                const canvas = document.getElementById("wCanvas"); const ctx = canvas.getContext("2d");
                const cont = document.getElementById("inCont");
                let defaults = ["Ja", "Nee", "Strafwerk", "Vrij", "Kies Iemand", "Huiswerk", "Pauze", "Game On"];
                let inputs = [];

                for(let i=0; i<8; i++) {
                    let inp = document.createElement("input"); inp.type = "text"; inp.value = defaults[i];
                    inp.oninput = teken; cont.appendChild(inp); inputs.push(inp);
                }

                let hStart = 0; let spinnt = false;
                function teken() {
                    let opts = inputs.map(id => id.value.trim()).filter(v => v.length > 0);
                    if(opts.length === 0) opts = ["..."];
                    let bg = (2 * Math.PI) / opts.length; ctx.clearRect(0,0,200,200);
                    let kls = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", "#1abc9c", "#e67e22", "#e84393"];
                    
                    opts.forEach((op, i) => {
                        let h = hStart + i * bg; ctx.fillStyle = kls[i % kls.length];
                        ctx.beginPath(); ctx.moveTo(100,100); ctx.arc(100,100,100,h,h+bg); ctx.lineTo(100,100); ctx.fill();
                        ctx.save(); ctx.translate(100,100); ctx.rotate(h + bg/2); ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif";
                        ctx.textAlign = "right"; ctx.fillText(op.substring(0,8), 85, 3); ctx.restore(); ctx.restore();
                    });
                }
                teken();

                document.getElementById("spinBtn").onclick = () => {
                    if(spinnt) return; spinnt = true;
                    document.getElementById("res").innerText = "Draaien... 🎡";
                    let sp = Math.random() * 0.2 + 0.35;
                    let loop = setInterval(() => {
                        sp *= 0.98; hStart += sp; teken();
                        if(sp < 0.004) {
                            clearInterval(loop); spinnt = false;
                            let opts = inputs.map(id => id.value.trim()).filter(v => v.length > 0);
                            let bg = (2 * Math.PI) / opts.length;
                            let idx = Math.floor((((1.5 * Math.PI - hStart) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / bg);
                            document.getElementById("res").innerText = "🎉 Resultaat: " + opts[idx];
                        }
                    }, 20);
                };
            }
            startSnake();
        </script>
    </body>
    </html>
    `;

    const win = window.open("", "SmartschoolGames", `width=480,height=580,left=${screen.width/2 - 240},top=100,menubar=no,status=no,toolbar=no`);
    win.document.open();
    win.document.write(gameHTML);
    win.document.close();
}