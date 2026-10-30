// ============================================================
// REEL BIG CATCH: 2-PLAYER TURN-BASED COMPETITIVE SHOWDOWN
// 5 Fish Catch Competition with Telescopic Accordion Fish
// ============================================================

// --- Translations Dictionary (Bilingual: English & Spanish) ---
const I18N = {
    en: {
        title: "REEL BIG CATCH",
        subtitle: "2-Player Turn-Based Showdown (5 Fish Limit)",
        tagTurnDuel: "Turn-Based Duel",
        waiting: "Waiting...",
        yourTurn: "YOUR TURN TO FISH!",
        p1DefaultName: "Player 1",
        p2DefaultName: "Player 2",
        fishLabel: "Fishes",
        scoreLabel: "Total Score",
        biggestLabel: "Biggest Catch",
        roundLabel: "Round",
        ofLabel: "of",
        turnBanner: "{name}'s Turn — Catch Fish #{num}!",
        castPrompt: "Move rod and press SPACE or click CAST!",
        btnCast: "CAST HOOK",
        btnReel: "REEL IN",
        btnPlayAgain: "Play Again",
        btnSettings: "Settings",
        btnStartGame: "Start Fishing Match",
        settingsTitle: "Match Configuration",
        p1NameLabel: "Player 1 Name",
        p2NameLabel: "Player 2 Name",
        targetFishLabel: "Fish Target per Player",
        winCondLabel: "Winning Rule",
        winCondBiggest: "Biggest Single Fish Wins (Recommended)",
        winCondTotal: "Highest Total Score (cm) Wins",
        diffLabel: "Fish Swimming Speed",
        diffCalm: "Calm Water",
        diffNormal: "Normal",
        diffFast: "Fast Current",
        matchOver: "Match Completed!",
        winnerDeclared: "🏆 {name} Wins the Trophy!",
        tieDeclared: "🤝 Epic Tie! Both Caught {size} cm!",
        winReasonBiggest: "Caught the Biggest Fish: {size} cm!",
        winReasonTotal: "Scored the Highest Total: {score} cm!",
        p1CatchHistory: "Player 1's Catches",
        p2CatchHistory: "Player 2's Catches",
        measuringTitle: "MEASURING CATCH...",
        toastNewRecord: "🌟 New Personal Record: {size} cm!",
        toastTurnSwitch: "🎣 Next Up: {name}'s Turn!",
        fishRarities: {
            1: "Small Fry",
            2: "Standard Snapper",
            3: "Big Catch!",
            4: "Monster Whopper!",
            5: "Giant Marlin!",
            6: "LEGENDARY LEVIATHAN!"
        },
        controlsGuide: "Controls: [A / D] or [Arrows] Move Rod | [SPACE / ENTER / Click] Cast & Reel"
    },
    es: {
        title: "REEL BIG CATCH",
        subtitle: "Duelo por Turnos para 2 Jugadores (Límite 5 Peces)",
        tagTurnDuel: "Duelo por Turnos",
        waiting: "Esperando...",
        yourTurn: "¡TU TURNO DE PESCAR!",
        p1DefaultName: "Jugador 1",
        p2DefaultName: "Jugador 2",
        fishLabel: "Peces",
        scoreLabel: "Puntos Totales",
        biggestLabel: "Pez Mayor",
        roundLabel: "Ronda",
        ofLabel: "de",
        turnBanner: "¡Turno de {name} — Pez #{num}!",
        castPrompt: "¡Mueve la caña y presiona ESPACIO o HAZ CLIC!",
        btnCast: "LANZAR ANZUELO",
        btnReel: "RECOGER",
        btnPlayAgain: "Revancha",
        btnSettings: "Ajustes",
        btnStartGame: "Iniciar Duelo de Pesca",
        settingsTitle: "Configuración de la Partida",
        p1NameLabel: "Nombre Jugador 1",
        p2NameLabel: "Nombre Jugador 2",
        targetFishLabel: "Peces por Jugador",
        winCondLabel: "Condición de Victoria",
        winCondBiggest: "Gana el Pez Más Grande (Recomendado)",
        winCondTotal: "Gana Mayor Puntuación Total (cm)",
        diffLabel: "Velocidad de Peces",
        diffCalm: "Aguas Calmas",
        diffNormal: "Normal",
        diffFast: "Corriente Rápida",
        matchOver: "¡Partida Finalizada!",
        winnerDeclared: "🏆 ¡{name} se lleva el Trofeo!",
        tieDeclared: "🤝 ¡Empate Épico! ¡Ambos con {size} cm!",
        winReasonBiggest: "¡Sacó el pez más grande: {size} cm!",
        winReasonTotal: "¡Logró la mayor puntuación: {score} cm!",
        p1CatchHistory: "Peces de Jugador 1",
        p2CatchHistory: "Peces de Jugador 2",
        measuringTitle: "MIDIENDO CAPTURA...",
        toastNewRecord: "🌟 ¡Nuevo Récord Personal: {size} cm!",
        toastTurnSwitch: "🎣 Siguiente Turno: ¡{name}!",
        fishRarities: {
            1: "Pez Pequeño",
            2: "Pargo Estándar",
            3: "¡Gran Captura!",
            4: "¡Monstruo Enorme!",
            5: "¡Marlín Gigante!",
            6: "¡LEVIATÁN LEGENDARIO!"
        },
        controlsGuide: "Controles: [A / D] o [Flechas] Mover Caña | [ESPACIO / ENTER / Clic] Lanzar y Recoger"
    }
};

let currentLang = 'en'; // Default in English as requested for English class / "peces inglés"

function t(key, replacements = {}) {
    let str = I18N[currentLang][key] || key;
    for (const [k, v] of Object.entries(replacements)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return str;
}

// --- Game Global State ---
const state = {
    active: false,
    maxFishPerPlayer: 5, // Exactly 5 fish limit per player!
    winCondition: 'biggest', // 'biggest' (biggest single fish) or 'total' (sum of cm)
    difficulty: 'normal',   // 'calm', 'normal', 'fast'
    activePlayer: 1,        // 1 or 2
    roundNumber: 1,         // 1 to 5
    players: {
        1: {
            name: "Player 1",
            color: "#38bdf8",
            colorDark: "#0284c7",
            catches: [], // array of { segments, lengthCm, color, name }
            score: 0,
            maxFish: 0
        },
        2: {
            name: "Player 2",
            color: "#fb923c",
            colorDark: "#ea580c",
            catches: [],
            score: 0,
            maxFish: 0
        }
    },
    measuringFish: null,
    turnTransitioning: false
};

// --- Active Fishing Rod State ---
const rodSpeed = 7.5;
const lineDropSpeed = 6.0;
const lineReelSpeed = 7.5;

const activeRod = {
    x: 0,
    y: 95, // Water surface level
    rodX: 0,
    state: 'IDLE', // 'IDLE', 'CASTING', 'REELING'
    hookedFish: null
};

// Pressed Keys Map
const keysPressed = {};

// --- Fish Class ---
class Fish {
    constructor(x, y, segmentsCount, speed, direction) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.x = x;
        this.y = y;
        this.segmentsCount = segmentsCount; // 1 to 6 segments (15cm to 90cm)
        this.lengthCm = segmentsCount * 15;
        this.speed = speed;
        this.direction = direction; // 1 = right, -1 = left
        this.headRadius = 24;
        this.isHooked = false;
        this.isBeingMeasured = false;
        this.deployProgress = 0;
        this.measured = false;
        this.wobblePhase = Math.random() * Math.PI * 2;

        // Fish visual styles & colors based on segment size
        const palette = [
            { body: '#22d3ee', belly: '#a5f3fc', fin: '#06b6d4' }, // Cyan Guppy
            { body: '#4ade80', belly: '#bbf7d0', fin: '#16a34a' }, // Emerald Snapper
            { body: '#f43f5e', belly: '#fecdd3', fin: '#e11d48' }, // Ruby Bass
            { body: '#c084fc', belly: '#f3e8ff', fin: '#9333ea' }, // Purple Tuna
            { body: '#fb923c', belly: '#fed7aa', fin: '#ea580c' }, // Orange Marlin
            { body: '#facc15', belly: '#fef08a', fin: '#ca8a04' }  // Golden Legend
        ];
        this.style = palette[(segmentsCount - 1) % palette.length];
    }

    update(speedMultiplier) {
        if (!this.isHooked && !this.isBeingMeasured) {
            this.x += this.speed * speedMultiplier * this.direction;
            this.wobblePhase += 0.08;

            // Wrap around horizontal canvas boundaries
            if (this.direction === 1 && this.x > canvas.width + 60) {
                this.x = -60;
                this.y = 140 + Math.random() * (canvas.height - 200);
            } else if (this.direction === -1 && this.x < -60) {
                this.x = canvas.width + 60;
                this.y = 140 + Math.random() * (canvas.height - 200);
            }
        }
    }

    draw(ctx) {
        ctx.save();

        if (this.isBeingMeasured) {
            // ==========================================
            // TELESCOPIC EXPANDING MEASUREMENT ANIMATION
            // ==========================================
            ctx.translate(this.x, this.y);

            const segmentHeight = 36;
            const maxExtend = this.segmentsCount * segmentHeight;
            const currentExtend = maxExtend * this.deployProgress;

            // 1. Draw Wooden / Yellow Measuring Ruler on the right side
            ctx.save();
            const rulerX = 46;
            const rulerHeight = maxExtend + 45;

            // Ruler Body with 3D bevel
            ctx.fillStyle = '#fde047';
            ctx.strokeStyle = '#ca8a04';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(rulerX, -28, 32, rulerHeight, 6);
            ctx.fill();
            ctx.stroke();

            // Ruler cm tick marks & numbers
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 10px Quicksand, sans-serif';
            ctx.textAlign = 'left';

            for (let i = 0; i <= this.segmentsCount; i++) {
                const tickY = -12 + i * segmentHeight;
                ctx.beginPath();
                ctx.moveTo(rulerX, tickY);
                ctx.lineTo(rulerX + 10, tickY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#0f172a';
                ctx.stroke();

                ctx.fillText(`${i * 15}cm`, rulerX + 11, tickY + 3);

                // Half tick
                if (i < this.segmentsCount) {
                    ctx.beginPath();
                    ctx.moveTo(rulerX, tickY + segmentHeight / 2);
                    ctx.lineTo(rulerX + 5, tickY + segmentHeight / 2);
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            ctx.restore();

            // 2. Draw Telescopic Body Segments
            for (let i = this.segmentsCount; i >= 1; i--) {
                const segY = (i / this.segmentsCount) * currentExtend;

                ctx.fillStyle = this.style.body;
                ctx.strokeStyle = '#0f172a';
                ctx.lineWidth = 3;

                ctx.beginPath();
                ctx.roundRect(-this.headRadius + 2, segY - 12, (this.headRadius - 2) * 2, 32, 8);
                ctx.fill();
                ctx.stroke();

                // Decorative scales/stripes
                ctx.fillStyle = this.style.belly;
                ctx.beginPath();
                ctx.roundRect(-this.headRadius + 6, segY - 4, (this.headRadius - 6) * 2, 8, 4);
                ctx.fill();

                // Segment Joint Rings
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-this.headRadius + 3, segY + 16);
                ctx.lineTo(this.headRadius - 3, segY + 16);
                ctx.stroke();
            }

            // 3. Tail Fin at the bottom
            const tailY = currentExtend + 16;
            ctx.fillStyle = this.style.fin;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-12, tailY);
            ctx.lineTo(0, tailY + 22);
            ctx.lineTo(12, tailY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 4. Draw Head looking upwards
            this.drawHead(ctx, 0, 0, -Math.PI / 2);

            // 5. Celebration text & size callout
            if (this.deployProgress > 0.8) {
                ctx.save();
                ctx.font = 'bold 26px "Fredoka One", cursive';
                ctx.textAlign = 'center';

                // Shadow
                ctx.fillStyle = '#0f172a';
                ctx.fillText(`🎉 ${this.lengthCm} cm!`, 0, -42);

                // Foreground
                ctx.fillStyle = this.segmentsCount >= 5 ? '#facc15' : '#ffffff';
                ctx.fillText(`🎉 ${this.lengthCm} cm!`, 0, -44);

                // Rarity title
                const rarityTitle = I18N[currentLang].fishRarities[this.segmentsCount] || "Great Catch!";
                ctx.font = 'bold 13px Quicksand, sans-serif';
                ctx.fillStyle = '#fef08a';
                ctx.fillText(rarityTitle, 0, -22);
                ctx.restore();
            }

        } else {
            // Swimming underwater horizontally
            ctx.translate(this.x, this.y);
            const angle = this.direction === 1 ? 0 : Math.PI;

            // Swimming gentle vertical wiggle
            const wiggleY = Math.sin(this.wobblePhase) * 2.5;
            ctx.translate(0, wiggleY);

            // Tail fin swimming wiggle
            ctx.save();
            ctx.rotate(angle);

            ctx.fillStyle = this.style.fin;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2.5;

            const tailWiggle = Math.sin(this.wobblePhase * 1.5) * 4;
            ctx.beginPath();
            ctx.moveTo(-16, -10 + tailWiggle);
            ctx.lineTo(-32, tailWiggle);
            ctx.lineTo(-16, 10 + tailWiggle);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Main Head Dome
            this.drawHead(ctx, 0, 0, 0);
            ctx.restore();
        }

        ctx.restore();
    }

    drawHead(ctx, x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Body Head Dome
        ctx.fillStyle = this.style.body;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(0, 0, this.headRadius, -Math.PI / 2, Math.PI / 2, false);
        ctx.lineTo(-12, this.headRadius);
        ctx.lineTo(-12, -this.headRadius);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Belly Patch
        ctx.fillStyle = this.style.belly;
        ctx.beginPath();
        ctx.arc(0, 6, this.headRadius * 0.65, 0, Math.PI, false);
        ctx.fill();

        // Cute Fin
        ctx.fillStyle = this.style.fin;
        ctx.beginPath();
        ctx.ellipse(-2, 8, 9, 5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Mouth Hole (target for hook!)
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(14, 0, 7.5, 0, Math.PI * 2);
        ctx.fill();

        // Big Cartoon Eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(4, -10, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupil
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(6, -10, 4, 0, Math.PI * 2);
        ctx.fill();

        // Eye Shines (Double shine)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(7.5, -11.5, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(5, -8.5, 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Active Fishes on Screen
let fishes = [];

// Bubble particles system in water
let bubbles = [];

function initBubbles() {
    bubbles = [];
    for (let i = 0; i < 25; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: 110 + Math.random() * (canvas.height - 110),
            radius: 1.5 + Math.random() * 3.5,
            speed: 0.4 + Math.random() * 0.8,
            wobble: Math.random() * Math.PI * 2
        });
    }
}

function updateBubbles() {
    bubbles.forEach(b => {
        b.y -= b.speed;
        b.wobble += 0.04;
        b.x += Math.sin(b.wobble) * 0.3;
        if (b.y < 100) {
            b.y = canvas.height - 10;
            b.x = Math.random() * canvas.width;
        }
    });
}

function drawBubbles(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
    ctx.restore();
}

// Spawn varied fishes swimming at different water depths
function spawnFishes() {
    fishes = [];
    const rows = 4;
    const waterTop = 145;
    const waterBottom = canvas.height - 45;
    const rowHeight = (waterBottom - waterTop) / rows;

    for (let i = 0; i < rows; i++) {
        const count = 3; // 3 fish per depth row
        for (let j = 0; j < count; j++) {
            const x = Math.random() * canvas.width;
            const y = waterTop + i * rowHeight + Math.random() * 12;

            // Randomized segments: 1 (15cm) up to 6 (90cm)
            // Weighted distribution so big ones are exciting!
            const rand = Math.random();
            let segments = 2;
            if (rand < 0.25) segments = 1;      // 15 cm
            else if (rand < 0.55) segments = 2; // 30 cm
            else if (rand < 0.78) segments = 3; // 45 cm
            else if (rand < 0.92) segments = 4; // 60 cm
            else if (rand < 0.98) segments = 5; // 75 cm
            else segments = 6;                  // 90 cm (Legendary!)

            const speed = 1.0 + Math.random() * 1.6;
            const dir = Math.random() > 0.5 ? 1 : -1;

            fishes.push(new Fish(x, y, segments, speed, dir));
        }
    }
}

// ==========================================
// Canvas & Physics Loop Setup
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    if (activeRod.rodX === 0) {
        activeRod.rodX = canvas.width / 2;
        activeRod.x = canvas.width / 2;
    }
}
window.addEventListener('resize', resizeCanvas);

// --- User Input Controllers ---
window.addEventListener('keydown', (e) => {
    if (['KeyA', 'KeyD', 'KeyW', 'KeyS', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code)) {
        if (state.active) e.preventDefault();
    }
    keysPressed[e.code] = true;

    if (state.active && !state.turnTransitioning && !state.measuringFish) {
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowDown') {
            toggleCast();
        }
    }
});

window.addEventListener('keyup', (e) => {
    keysPressed[e.code] = false;
});

// Canvas Mouse / Touch Aiming & Casting
let isPointerDown = false;

canvas.addEventListener('pointerdown', (e) => {
    if (!state.active || state.turnTransitioning || state.measuringFish) return;
    isPointerDown = true;
    updateRodToPointer(e);
});

canvas.addEventListener('pointermove', (e) => {
    if (!state.active || state.turnTransitioning || state.measuringFish) return;
    if (isPointerDown || activeRod.state === 'IDLE') {
        updateRodToPointer(e);
    }
});

window.addEventListener('pointerup', () => {
    isPointerDown = false;
});

function updateRodToPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clampedX = Math.max(30, Math.min(canvas.width - 30, clientX));
    activeRod.rodX = clampedX;
    if (activeRod.state === 'IDLE') {
        activeRod.x = clampedX;
    }
}

function toggleCast() {
    if (!state.active || state.turnTransitioning || state.measuringFish) return;

    if (activeRod.state === 'IDLE') {
        activeRod.state = 'CASTING';
        window.soundEngine.playCast();
        updateActionButtonUI();
    } else if (activeRod.state === 'CASTING') {
        activeRod.state = 'REELING';
        window.soundEngine.playReel();
        updateActionButtonUI();
    }
}

// Action Button in UI
const btnActionCast = document.getElementById('btn-action-cast');
if (btnActionCast) {
    btnActionCast.addEventListener('click', () => {
        toggleCast();
    });
}

function updateActionButtonUI() {
    if (!btnActionCast) return;
    if (activeRod.state === 'IDLE') {
        btnActionCast.innerHTML = `<i class="fa-solid fa-angles-down mr-1"></i> ${t('btnCast')}`;
        btnActionCast.className = "flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-game text-base rounded-2xl shadow-lg border-2 border-white/30 btn-bounce uppercase tracking-wider flex items-center justify-center";
    } else {
        btnActionCast.innerHTML = `<i class="fa-solid fa-angles-up mr-1"></i> ${t('btnReel')}`;
        btnActionCast.className = "flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-game text-base rounded-2xl shadow-lg border-2 border-white/30 btn-bounce uppercase tracking-wider flex items-center justify-center animate-pulse";
    }
}

// --- Keyboard Movement ---
function processKeyboardInputs() {
    if (!state.active || state.turnTransitioning || state.measuringFish) return;

    // Move Rod Horizontally (WASD or Arrows)
    if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
        activeRod.rodX = Math.max(30, activeRod.rodX - rodSpeed);
    }
    if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
        activeRod.rodX = Math.min(canvas.width - 30, activeRod.rodX + rodSpeed);
    }

    if (activeRod.state === 'IDLE') {
        activeRod.x = activeRod.rodX;
    }

    // Manual Reeling control
    if ((keysPressed['KeyW'] || keysPressed['ArrowUp']) && activeRod.state === 'CASTING') {
        activeRod.y = Math.max(95, activeRod.y - lineReelSpeed);
    }
}

// --- Rod & Hook Physics ---
function updateRodPhysics() {
    const surfaceY = 95;

    if (activeRod.state === 'IDLE') {
        activeRod.x = activeRod.rodX;
        activeRod.y = surfaceY;
    } else if (activeRod.state === 'CASTING') {
        activeRod.x = activeRod.rodX;
        if (activeRod.y < canvas.height - 35) {
            activeRod.y += lineDropSpeed;
        } else {
            // Hit bottom: automatically reel up
            activeRod.state = 'REELING';
            window.soundEngine.playReel();
            updateActionButtonUI();
        }
    } else if (activeRod.state === 'REELING') {
        activeRod.x = activeRod.rodX;
        if (activeRod.y > surfaceY) {
            activeRod.y -= lineReelSpeed;
        } else {
            activeRod.y = surfaceY;
            activeRod.state = 'IDLE';
            updateActionButtonUI();

            // Hook arrived at surface with a catch!
            if (activeRod.hookedFish) {
                const caught = activeRod.hookedFish;
                activeRod.hookedFish = null;
                startFishMeasurement(caught);
            }
        }
    }
}

// --- Measurement Sequence ---
function startFishMeasurement(fish) {
    state.measuringFish = fish;
    fish.isBeingMeasured = true;
    fish.deployProgress = 0;
    fish.x = canvas.width / 2;
    fish.y = 115;
    fish.catcherId = state.activePlayer;

    window.soundEngine.playSplash();
    showToast(t('measuringTitle'));
}

let lastSegmentChime = 0;

function updateMeasurementAnimation() {
    const fish = state.measuringFish;
    if (!fish) return;

    if (fish.deployProgress < 1) {
        fish.deployProgress += 0.022;

        // Play accordion stretch sounds as each segment reveals
        const currentSegment = Math.floor(fish.deployProgress * fish.segmentsCount);
        if (currentSegment > lastSegmentChime) {
            lastSegmentChime = currentSegment;
            window.soundEngine.playSegmentStretch(currentSegment);
        }

        if (fish.deployProgress >= 1) {
            fish.deployProgress = 1;

            if (!fish.measured) {
                fish.measured = true;
                lastSegmentChime = 0;

                const player = state.players[fish.catcherId];
                const points = fish.lengthCm;
                player.score += points;

                const isNewRecord = points > player.maxFish;
                if (isNewRecord) {
                    player.maxFish = points;
                }

                // Record to player's catches
                player.catches.push({
                    segments: fish.segmentsCount,
                    lengthCm: fish.lengthCm,
                    style: fish.style,
                    rarity: I18N[currentLang].fishRarities[fish.segmentsCount] || "Fish"
                });

                // Play celebrations
                window.soundEngine.playCatchFanfare(fish.segmentsCount >= 4);

                if (isNewRecord && player.catches.length > 1) {
                    showToast(t('toastNewRecord', { size: points }));
                }

                updateHUD();

                // Wait 1.6s to appreciate the catch, then switch turn or finish match!
                setTimeout(() => {
                    // Respawn a new fish swimming in the water
                    fishes = fishes.filter(f => f.id !== fish.id);
                    state.measuringFish = null;

                    const y = 140 + Math.random() * (canvas.height - 200);
                    const rand = Math.random();
                    let seg = 2;
                    if (rand < 0.25) seg = 1;
                    else if (rand < 0.55) seg = 2;
                    else if (rand < 0.78) seg = 3;
                    else if (rand < 0.92) seg = 4;
                    else if (rand < 0.98) seg = 5;
                    else seg = 6;

                    fishes.push(new Fish(-50, y, seg, 1.1 + Math.random() * 1.5, 1));

                    // Check if match completed (both have reached target fish)
                    checkTurnProgression();
                }, 1600);
            }
        }
    }
}

// --- Turn Progression & Win Evaluation ---
function checkTurnProgression() {
    const p1Count = state.players[1].catches.length;
    const p2Count = state.players[2].catches.length;

    // Have both reached max fish limit (5 each)?
    if (p1Count >= state.maxFishPerPlayer && p2Count >= state.maxFishPerPlayer) {
        finishMatch();
        return;
    }

    // Otherwise, toggle to next turn!
    state.turnTransitioning = true;

    if (state.activePlayer === 1) {
        state.activePlayer = 2;
    } else {
        state.activePlayer = 1;
        state.roundNumber = Math.min(state.maxFishPerPlayer, state.roundNumber + 1);
    }

    const nextPlayer = state.players[state.activePlayer];
    window.soundEngine.playTurnChange();
    showToast(t('toastTurnSwitch', { name: nextPlayer.name }));
    updateHUD();

    setTimeout(() => {
        state.turnTransitioning = false;
        activeRod.state = 'IDLE';
        activeRod.rodX = canvas.width / 2;
        activeRod.x = canvas.width / 2;
        updateActionButtonUI();
    }, 800);
}

function finishMatch() {
    state.active = false;
    window.soundEngine.playVictory();
    window.confettiCannon.fire(5000);

    const p1 = state.players[1];
    const p2 = state.players[2];

    const titleEl = document.getElementById('winner-title');
    const reasonEl = document.getElementById('winner-reason');

    let winnerId = 0; // 0 = tie, 1 = p1, 2 = p2

    if (state.winCondition === 'biggest') {
        // Winner is whoever caught the biggest single fish!
        if (p1.maxFish > p2.maxFish) {
            winnerId = 1;
        } else if (p2.maxFish > p1.maxFish) {
            winnerId = 2;
        } else {
            // Tie breaker: Total score!
            if (p1.score > p2.score) winnerId = 1;
            else if (p2.score > p1.score) winnerId = 2;
            else winnerId = 0;
        }
    } else {
        // Total score condition
        if (p1.score > p2.score) winnerId = 1;
        else if (p2.score > p1.score) winnerId = 2;
        else winnerId = 0;
    }

    if (winnerId === 1) {
        titleEl.textContent = t('winnerDeclared', { name: p1.name });
        titleEl.className = "font-game text-3xl sm:text-4xl text-cyan-300 drop-shadow";
        reasonEl.textContent = state.winCondition === 'biggest' 
            ? t('winReasonBiggest', { size: p1.maxFish })
            : t('winReasonTotal', { score: p1.score });
    } else if (winnerId === 2) {
        titleEl.textContent = t('winnerDeclared', { name: p2.name });
        titleEl.className = "font-game text-3xl sm:text-4xl text-orange-400 drop-shadow";
        reasonEl.textContent = state.winCondition === 'biggest'
            ? t('winReasonBiggest', { size: p2.maxFish })
            : t('winReasonTotal', { score: p2.score });
    } else {
        titleEl.textContent = t('tieDeclared', { size: p1.maxFish });
        titleEl.className = "font-game text-3xl sm:text-4xl text-yellow-300 drop-shadow";
        reasonEl.textContent = `${p1.score} cm vs ${p2.score} cm`;
    }

    // Populate Results Modal
    document.getElementById('res-p1-name').textContent = p1.name;
    document.getElementById('res-p2-name').textContent = p2.name;

    document.getElementById('res-p1-total').textContent = `${p1.score} cm`;
    document.getElementById('res-p2-total').textContent = `${p2.score} cm`;

    document.getElementById('res-p1-biggest').textContent = `${p1.maxFish} cm`;
    document.getElementById('res-p2-biggest').textContent = `${p2.maxFish} cm`;

    // Render Fish Badges Breakdown in modal
    renderModalCatches('res-p1-fish-list', p1.catches);
    renderModalCatches('res-p2-fish-list', p2.catches);

    document.getElementById('overlay-results').classList.remove('hidden');
}

function renderModalCatches(containerId, catches) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    catches.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between p-1.5 rounded-xl bg-slate-900 border border-slate-700/60 text-xs";
        item.innerHTML = `
            <div class="flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px]" style="background: ${c.style.body}; color: #0f172a">#${idx + 1}</span>
                <span class="font-bold text-slate-200">${c.rarity}</span>
            </div>
            <span class="font-game text-yellow-300">${c.lengthCm} cm</span>
        `;
        container.appendChild(item);
    });
}

// --- Main Game Update Loop ---
function updateGame() {
    if (!state.active) return;

    processKeyboardInputs();
    updateRodPhysics();
    updateBubbles();

    // Speed multiplier from difficulty
    let diffMult = 1.0;
    if (state.difficulty === 'calm') diffMult = 0.7;
    if (state.difficulty === 'fast') diffMult = 1.5;

    fishes.forEach(fish => fish.update(diffMult));

    // Collision Detection: Active Rod Hook vs Fishes
    if (!state.measuringFish && !state.turnTransitioning) {
        if (activeRod.state === 'CASTING' || activeRod.state === 'REELING') {
            fishes.forEach(fish => {
                if (!fish.isHooked && !fish.isBeingMeasured && !activeRod.hookedFish) {
                    const dist = Math.hypot(fish.x - activeRod.x, fish.y - activeRod.y);

                    if (dist < fish.headRadius + 8) {
                        // Hooked!
                        fish.isHooked = true;
                        activeRod.hookedFish = fish;
                        activeRod.state = 'REELING'; // reel up immediately
                        window.soundEngine.playHook();
                        updateActionButtonUI();
                    }
                }
            });
        }
    }

    // Move hooked fish with hook
    if (activeRod.hookedFish) {
        activeRod.hookedFish.x = activeRod.x;
        activeRod.hookedFish.y = activeRod.y;
    }

    // Measurement animation
    if (state.measuringFish) {
        updateMeasurementAnimation();
    }
}

// --- Canvas Render Loop ---
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const surfaceY = 95;

    // 1. Sky & Sun
    const skyGrad = ctx.createLinearGradient(0, 0, 0, surfaceY);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, surfaceY);

    // Sun
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, 36, 20, 0, Math.PI * 2);
    ctx.fill();

    // Distant Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    drawCloud(ctx, canvas.width * 0.15, 28, 22);
    drawCloud(ctx, canvas.width * 0.55, 34, 18);

    // 2. Fishes Swimming Underwater
    fishes.forEach(f => {
        if (!f.isBeingMeasured) f.draw(ctx);
    });

    // 3. Water Underwater Layer
    const waterGrad = ctx.createLinearGradient(0, surfaceY, 0, canvas.height);
    waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.65)');
    waterGrad.addColorStop(1, 'rgba(3, 105, 161, 0.90)');
    ctx.fillStyle = waterGrad;

    // Animated Water Surface Wave
    ctx.beginPath();
    ctx.moveTo(0, surfaceY);
    for (let x = 0; x <= canvas.width; x += 25) {
        ctx.lineTo(x, surfaceY + Math.sin(x * 0.035 + Date.now() * 0.0028) * 4);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Rising Bubbles
    drawBubbles(ctx);

    // 4. Active Player Fishing Rod & Hook
    const activeColor = state.activePlayer === 1 ? '#38bdf8' : '#fb923c';
    const activeDark = state.activePlayer === 1 ? '#0284c7' : '#ea580c';

    // Fishing Line
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(activeRod.rodX, 0);
    ctx.lineTo(activeRod.x, activeRod.y);
    ctx.stroke();

    // Rod Reel Guide at top
    ctx.fillStyle = activeColor;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(activeRod.rodX, 8, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Hook Claw
    ctx.save();
    ctx.translate(activeRod.x, activeRod.y);

    ctx.strokeStyle = activeDark;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -6, 8, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = activeColor;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    // Subtle hook bait icon
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(7, -6, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 5. Measuring Fish (Drawn on top of everything)
    if (state.measuringFish) {
        state.measuringFish.draw(ctx);
    }
}

function drawCloud(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.arc(x + r * 0.7, y - r * 0.2, r * 0.8, 0, Math.PI * 2);
    ctx.arc(x + r * 1.4, y, r * 0.7, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// ==========================================
// HUD & DOM Management
// ==========================================
function updateHUD() {
    const p1 = state.players[1];
    const p2 = state.players[2];

    // Names & Totals
    document.getElementById('p1-name-display').textContent = p1.name;
    document.getElementById('p2-name-display').textContent = p2.name;

    document.getElementById('p1-score-display').textContent = `${p1.score} cm`;
    document.getElementById('p2-score-display').textContent = `${p2.score} cm`;

    document.getElementById('p1-biggest-display').textContent = `${p1.maxFish} cm`;
    document.getElementById('p2-biggest-display').textContent = `${p2.maxFish} cm`;

    // Active Card Glow
    const p1Card = document.getElementById('p1-hud-card');
    const p2Card = document.getElementById('p2-hud-card');

    p1Card.classList.remove('active-turn-p1');
    p2Card.classList.remove('active-turn-p2');

    const p1Status = document.getElementById('p1-turn-badge');
    const p2Status = document.getElementById('p2-turn-badge');

    if (state.activePlayer === 1) {
        p1Card.classList.add('active-turn-p1');
        p1Status.innerHTML = `<i class="fa-solid fa-fish-fins mr-1"></i> ${t('yourTurn')}`;
        p1Status.className = "text-[10px] font-game px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 animate-pulse";

        p2Status.textContent = t('waiting');
        p2Status.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400";
    } else {
        p2Card.classList.add('active-turn-p2');
        p2Status.innerHTML = `<i class="fa-solid fa-fish-fins mr-1"></i> ${t('yourTurn')}`;
        p2Status.className = "text-[10px] font-game px-2 py-0.5 rounded-full bg-orange-400 text-slate-950 animate-pulse";

        p1Status.textContent = t('waiting');
        p1Status.className = "text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400";
    }

    // Turn Banner Header
    const curPlayer = state.players[state.activePlayer];
    const turnFishNum = curPlayer.catches.length + 1;
    document.getElementById('hud-turn-title').textContent = t('turnBanner', {
        name: curPlayer.name,
        num: Math.min(state.maxFishPerPlayer, turnFishNum)
    });

    document.getElementById('hud-round-tag').textContent = `${t('roundLabel')} ${state.roundNumber} ${t('ofLabel')} ${state.maxFishPerPlayer}`;

    // Render Fish Slots (5 slots for each player)
    renderPlayerSlots('p1-fish-slots', p1.catches, state.maxFishPerPlayer);
    renderPlayerSlots('p2-fish-slots', p2.catches, state.maxFishPerPlayer);
}

function renderPlayerSlots(containerId, catches, totalSlots) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < totalSlots; i++) {
        const slot = document.createElement('div');
        const caught = catches[i];

        if (caught) {
            slot.className = "fish-slot fish-slot-filled";
            slot.style.background = caught.style.body;
            slot.style.color = '#0f172a';
            slot.title = `${caught.rarity}: ${caught.lengthCm} cm`;
            slot.innerHTML = `
                <i class="fa-solid fa-fish text-xs"></i>
                <span class="text-[9px] font-bold leading-none mt-0.5">${caught.lengthCm}c</span>
            `;
        } else {
            slot.className = "fish-slot fish-slot-empty";
            slot.innerHTML = `<span class="text-xs text-slate-500">#${i + 1}</span>`;
        }
        container.appendChild(slot);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast-banner');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = message;

    toast.classList.remove('opacity-0', '-translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', '-translate-y-4');
    }, 2400);
}

// --- Match Setup & Lifecycle ---
function startMatch() {
    window.soundEngine.init();
    window.soundEngine.playClick();

    // Read names
    const p1Input = document.getElementById('input-p1-name').value.trim();
    const p2Input = document.getElementById('input-p2-name').value.trim();

    state.players[1].name = p1Input || t('p1DefaultName');
    state.players[2].name = p2Input || t('p2DefaultName');

    // Reset stats
    state.players[1].score = 0;
    state.players[1].maxFish = 0;
    state.players[1].catches = [];

    state.players[2].score = 0;
    state.players[2].maxFish = 0;
    state.players[2].catches = [];

    state.activePlayer = 1;
    state.roundNumber = 1;
    state.measuringFish = null;
    state.turnTransitioning = false;

    // Reset rod
    activeRod.rodX = canvas.width / 2;
    activeRod.x = canvas.width / 2;
    activeRod.y = 95;
    activeRod.state = 'IDLE';
    activeRod.hookedFish = null;

    // Hide overlays
    document.getElementById('overlay-menu').classList.add('hidden');
    document.getElementById('overlay-results').classList.add('hidden');

    updateHUD();
    spawnFishes();
    updateActionButtonUI();

    state.active = true;
    showToast(t('toastTurnSwitch', { name: state.players[1].name }));
}

// --- Setup Form UI Event Handlers ---
function initEventListeners() {
    // Start button
    document.getElementById('btn-start-game').addEventListener('click', startMatch);
    document.getElementById('btn-replay').addEventListener('click', startMatch);

    // Settings button
    document.getElementById('btn-reconfig').addEventListener('click', () => {
        window.soundEngine.playClick();
        document.getElementById('overlay-results').classList.add('hidden');
        document.getElementById('overlay-menu').classList.remove('hidden');
    });

    document.getElementById('btn-open-settings').addEventListener('click', () => {
        window.soundEngine.playClick();
        document.getElementById('overlay-menu').classList.remove('hidden');
    });

    // Sound toggle
    const btnSound = document.getElementById('btn-sound-toggle');
    btnSound.addEventListener('click', () => {
        window.soundEngine.init();
        window.soundEngine.enabled = !window.soundEngine.enabled;
        btnSound.innerHTML = window.soundEngine.enabled
            ? '<i class="fa-solid fa-volume-high text-lg"></i>'
            : '<i class="fa-solid fa-volume-xmark text-lg text-slate-500"></i>';
    });

    // Language Toggle (EN / ES)
    const btnLang = document.getElementById('btn-lang-toggle');
    btnLang.addEventListener('click', () => {
        window.soundEngine.playClick();
        currentLang = currentLang === 'en' ? 'es' : 'en';
        btnLang.textContent = currentLang === 'en' ? '🇺🇸 EN' : '🇪🇸 ES';
        applyTranslations();
    });

    // Fish Target presets (3, 5, 7)
    document.querySelectorAll('.target-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.soundEngine.playClick();
            document.querySelectorAll('.target-btn').forEach(b => {
                b.className = 'target-btn flex-1 py-2 rounded-xl border-2 border-slate-700 bg-slate-800 text-xs font-bold text-slate-300 hover:border-cyan-400 transition-all';
            });
            btn.className = 'target-btn flex-1 py-2 rounded-xl border-2 border-cyan-400 bg-cyan-500/20 text-xs font-bold text-cyan-200 transition-all';
            state.maxFishPerPlayer = parseInt(btn.dataset.target);
        });
    });

    // Winning Rule toggles (biggest vs total)
    document.querySelectorAll('.win-rule-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.soundEngine.playClick();
            document.querySelectorAll('.win-rule-btn').forEach(b => {
                b.className = 'win-rule-btn p-3 rounded-xl border-2 border-slate-700 bg-slate-800/80 text-slate-400 transition-all flex flex-col items-center text-center';
            });
            btn.className = 'win-rule-btn p-3 rounded-xl border-2 border-cyan-400 bg-cyan-500/20 text-cyan-200 transition-all flex flex-col items-center text-center';
            state.winCondition = btn.dataset.rule;
        });
    });

    // Difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.soundEngine.playClick();
            document.querySelectorAll('.diff-btn').forEach(b => {
                b.className = 'diff-btn py-1.5 rounded-xl border-2 border-slate-700 bg-slate-800 text-xs font-bold text-slate-300 transition-all';
            });
            btn.className = 'diff-btn py-1.5 rounded-xl border-2 border-emerald-400 bg-emerald-500/20 text-xs font-bold text-emerald-200 transition-all';
            state.difficulty = btn.dataset.diff;
        });
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });

    updateHUD();
    updateActionButtonUI();
}

// --- Initialization on Window Load ---
window.addEventListener('load', () => {
    resizeCanvas();
    initBubbles();
    spawnFishes();
    initEventListeners();
    applyTranslations();
    gameLoop();
});
