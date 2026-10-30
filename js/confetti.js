// ============================================================
// LIGHTWEIGHT CANVAS CONFETTI PARTICLE SYSTEM
// Specification:
// - Lightweight memory and CPU footprint (65 particles max)
// - Hardware-accelerated 2D canvas transforms
// - Automatic requestAnimationFrame cleanup and termination
// - No external libraries or asset loading overhead
// ============================================================

class ConfettiCannon {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animId = null;
    }

    init() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'confetti-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100vw';
            this.canvas.style.height = '100vh';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '999';
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    fire(duration = 4000) {
        this.init();
        const colors = ['#f43f5e', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#fb923c'];
        
        // Lightweight particle budget: 65 particles for high performance
        const count = 65;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: window.innerWidth * (0.2 + Math.random() * 0.6),
                y: window.innerHeight * 0.4,
                vx: (Math.random() - 0.5) * 14,
                vy: -(Math.random() * 12 + 5),
                size: Math.random() * 8 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.32,
                drag: 0.985,
                alpha: 1,
                lifespan: 140 + Math.random() * 60 // Max frame lifespan
            });
        }

        if (!this.animId) {
            this.loop();
        }
    }

    loop() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.vx *= p.drag;
            p.vy += p.gravity;
            p.vy *= p.drag;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.lifespan -= 1;

            if (p.lifespan < 40 || p.y > this.canvas.height - 30) {
                p.alpha -= 0.025;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
            this.ctx.restore();

            // Automatic cleanup when particle leaves screen or fades completely
            if (p.alpha <= 0 || p.y > this.canvas.height + 60 || p.lifespan <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Halt animation loop immediately when all particles have finished
        if (this.particles.length > 0) {
            this.animId = requestAnimationFrame(() => this.loop());
        } else {
            this.animId = null;
            if (this.ctx && this.canvas) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

window.confettiCannon = new ConfettiCannon();
