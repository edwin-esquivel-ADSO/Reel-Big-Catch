# 🎣 Reel Big Catch — Turn-Based 2-Player Fishing Duel (English / Español)

A competitive, turn-based HTML5 fishing game inspired by **Reel Big Catch**. Two players take turns catching fish, measuring their hidden telescopic accordion bodies, and competing to see who reels in the **biggest fish** over **5 rounds**!

---

## 🌟 Game Highlights & Rules

- **Turn-Based Competition (Por Turnos)**:
  - Players alternate turns: Player 1 fishes 1 fish, then Player 2 fishes 1 fish.
  - Exactly **5 fish per player** (5 rounds total).
- **Telescopic Fish Bodies (Peces Relativos)**:
  - Underwater, fish swim across different depths and their full length is hidden.
  - When reeled above the surface, each fish extends segment by segment (from **15 cm** up to **90 cm** Legendary Leviathans!) alongside an animated measuring ruler with custom cartoon sounds.
- **Winner Determination**:
  - **Biggest Single Fish Wins (Default)**: Whoever reels in the longest monster fish takes home the trophy!
  - Alternative mode: **Highest Total Score (cm)** sum of all catches.
- **Bilingual Interface**:
  - One-click instant language switcher: **English (EN)** / **Español (ES)**.
- **Universal Controls**:
  - **Keyboard**: `A` / `D` or `◄` / `►` to steer rod. `SPACE`, `ENTER`, or `▼` to Cast and Reel.
  - **Mouse / Trackpad**: Move cursor over water to aim; click water or click the **CAST HOOK** button.
  - **Mobile / Touch**: Touch & drag across water to steer; tap to drop hook.
- **100% Self-Contained Web Audio**:
  - Procedural sound synthesizer (water splashes, reel clicking, boing stretches, fanfares). Zero external audio files required!

---

## 🎮 How to Play Locally

Just open `index.html` in any web browser!

Or using a local Node server:
```bash
npm start
```
and open `http://localhost:3000`.

---

## 🚀 Deployment to Vercel (Despliegue en Vercel)

This project is pre-configured and 100% ready for Vercel with zero build configuration!

### Option 1: Via Vercel Web Dashboard (Easiest)
1. Push this folder to a GitHub repository (e.g. `reel-big-catch`).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Import your GitHub repository.
5. Leave the default settings (Framework Preset: **Other**) and click **"Deploy"**.
6. Done! Your fishing game will be live with a free `.vercel.app` URL.

### Option 2: Via Vercel CLI
1. Open PowerShell in this folder:
   ```powershell
   cd "C:\Users\esqui\OneDrive\Desktop\peces-ingles"
   ```
2. Run:
   ```powershell
   npx vercel
   ```
3. Follow the quick prompts in terminal (confirm project name and directory). It deploys immediately!

---

## 📁 Project Structure

```
peces-ingles/
├── index.html        # Main HTML5 game interface and HUD
├── styles.css        # Glassmorphism design, player theme glow, animations
├── game.js           # Turn-based game engine, fish physics, telescopic ruler
├── audio.js          # Web Audio API procedural sound engine
├── confetti.js       # Victory celebration particle system
├── vercel.json       # Vercel deployment headers & clean routing
├── package.json      # Node & Vercel package definition
└── README.md         # Documentation & deployment guide
```
