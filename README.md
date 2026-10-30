# 🎣 Reel Big Catch — 2-Player Turn-Based Fishing Duel

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Platform: Web / Vercel](https://img.shields.io/badge/Deploy-Vercel%20Ready-black.svg)](https://vercel.com)
[![Game Engine: HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5%20Canvas%2060FPS-cyan.svg)]()
[![Language: 100% English](https://img.shields.io/badge/Language-100%25%20English-blue.svg)]()

A fast-paced, competitive 2-player turn-based fishing game inspired by the classic **Reel Big Catch**. Two players take turns casting their lines, hooking mysterious swimming fish, and measuring their hidden **telescopic accordion bodies** along an animated ruler to see who reels in the **biggest fish** over **5 rounds**!

Designed with a clean, modular architecture, 100% English interface, lightweight 60 FPS animations, and pre-configured for instant zero-config deployment on **Vercel**.

---

## 🌟 Game Highlights & Mechanics

- 👥 **2-Player Turn-Based Competition**:
  - Alternate turns: Player 1 fishes 1 fish, then Player 2 fishes 1 fish.
  - Exactly **5 fish per player** (5 rounds = 10 total catches).
- 📏 **Telescopic Fish Bodies (Hidden Lengths)**:
  - Underwater, fish swim with their true sizes concealed.
  - When reeled above water, fish extend segment by segment from **15 cm** (Small Fry) up to **90 cm** (Legendary Leviathans!) alongside an animated wooden measuring ruler.
- 🏆 **Winning Conditions**:
  - **Biggest Single Fish Wins (Default)**: Whoever reels in the longest monster fish takes home the trophy! (Tie breaker: highest total cm).
  - Alternative mode: **Highest Total Score** (sum of all centimeters caught).
- 🎨 **Lightweight 60 FPS Visuals**:
  - GPU-accelerated CSS transforms (`translate`, `scale`, `opacity`).
  - Balanced glassmorphism without heavy GPU blur bottlenecks.
  - Low-overhead procedural bubble physics and an auto-terminating confetti victory cannon.
- 🔊 **Zero-Asset Procedural Web Audio**:
  - Native Web Audio API procedural synthesizer (water splashes, reel clicking, boing stretches, victory fanfares). Zero external MP3/WAV files required (0 KB network overhead!).
- 🌐 **100% English Experience**:
  - All HUD indicators, labels, modals, rarity callouts, and rules are purely in English.

---

## 🎮 How to Play

### Controls
| Action | Keyboard | Mouse / Trackpad | Mobile / Touch |
| :--- | :--- | :--- | :--- |
| **Move Fishing Rod** | <kbd>A</kbd> / <kbd>D</kbd> or <kbd>◄</kbd> / <kbd>►</kbd> | Move cursor over water | Touch & drag across water |
| **Drop Hook & Reel In** | <kbd>SPACE</kbd>, <kbd>ENTER</kbd>, or <kbd>▼</kbd> | Click water or click **CAST HOOK** | Tap water or tap **CAST HOOK** |
| **Reel Up Early** | <kbd>W</kbd> or <kbd>▲</kbd> | Click water again | Tap water again |

### Game Flow
1. **Setup Match**: Choose player names, target fish (3, 5, or 7), winning rule, and current swimming speed.
2. **Player 1 Turn**: Steer rod, drop hook into the water, and catch a swimming fish.
3. **Measurement Sequence**: The fish surfaces and expands telescopically with custom sound effects, recording its size in the player's catch history.
4. **Player 2 Turn**: Turn automatically toggles to Player 2 to catch their fish.
5. **Victory Ceremony**: Once both players catch 5 fish each, the final trophy ceremony displays the winner with a complete side-by-side catch breakdown.

---

## 📁 Clean Architecture & Project Structure

The project follows a clean, modular structure where `index.html` resides at the root for immediate static resolution on Vercel, with assets separated into dedicated directories:

```
Reel-Big-Catch/
├── css/
│   └── styles.css        # Lightweight 60 FPS styles & hardware-accelerated animations
├── js/
│   ├── audio.js          # Native Web Audio API procedural sound synthesizer
│   ├── confetti.js       # Memory-safe canvas confetti particle system
│   └── game.js           # Turn engine, collision physics, and measurement ruler
├── index.html            # Main HTML5 game UI, HUD, and Rules guide modal
├── package.json          # Node scripts for npm & pnpm
├── vercel.json           # Production security headers and clean routing
├── .gitignore            # Clean git exclusion rules
└── README.md             # Project documentation and deployment guide
```

---

## 🛠️ Installation & Local Setup

### Prerequisites
- Node.js (v18+) or any static HTTP server.

### 1. Clone the repository
```bash
git clone https://github.com/edwin-esquivel-ADSO/Reel-Big-Catch.git
cd Reel-Big-Catch
```

### 2. Start the local server

#### Using **npm**:
```bash
npm start
```
*(or `npm run dev`)*

#### Using **pnpm**:
```bash
pnpm start
```
*(or `pnpm dev`)*

#### Direct one-liner (without installing dependencies):
- **npm**: `npx serve -s . -l 3000`
- **pnpm**: `pnpm dlx serve -s . -l 3000`

### 3. Open in Browser
Visit **`http://localhost:3000`** in your browser.

---

## 🚀 Deployment to Vercel

This repository is pre-configured with `vercel.json` and ready for instant deployment on Vercel with zero configuration required.

### Method 1: Via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository: `edwin-esquivel-ADSO/Reel-Big-Catch`.
4. Keep the default settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
5. Click **"Deploy"**.
6. Your game will be live with an automatic HTTPS URL (e.g., `https://reel-big-catch.vercel.app`).

### Method 2: Via Vercel CLI
```bash
# Run Vercel CLI from the project directory
npx vercel

# For production deployment:
npx vercel --prod
```

---

## Créditos y Autoría Desarrollado y mantenido por:
Edwin Alejandro Esquivel Bahamon 
GitHub: https://github.com/edwin-esquivel-ADSO

## 📄 Licencia
Distribuido bajo la Licencia MIT. Eres libre de utilizar, modificar y distribuir esta herramienta en tus propios flujos de trabajo.
