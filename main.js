// js/main.js
import { createGrid, getTile, gridSize } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';

const gameContainer = document.getElementById("game");
const oreDisplay = document.getElementById("ore-count");
const titleScreen = document.getElementById("title-screen");

let isGameStarted = false;
let mineTimeout = null;

function updatePlayerPosition() {
  document.querySelectorAll(".player").forEach(el => el.classList.remove("player"));
  const tile = getTile(player.x, player.y);
  tile.classList.add("player");
}

document.addEventListener("keydown", (e) => {
  if (!isGameStarted && e.key === "Enter") {
    startGame();
    return;
  }

  if (!isGameStarted || e.repeat) return;

  switch (e.key) {
    case "ArrowUp":
      if (player.y > 0) player.y--;
      break;
    case "ArrowDown":
      if (player.y < gridSize - 1) player.y++;
      break;
    case "ArrowLeft":
      if (player.x > 0) player.x--;
      break;
    case "ArrowRight":
      if (player.x < gridSize - 1) player.x++;
      break;
    case "Enter":
      if (!mineTimeout) {
        mineTimeout = setTimeout(() => {
          mineTile(player.x, player.y);
          mineTimeout = null;
        }, 1000);
      }
      break;
  }

  updatePlayerPosition();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }
});

function startGame() {
  isGameStarted = true;
  titleScreen.style.display = "none";
  gameContainer.style.display = "grid";
  document.getElementById("hud").style.display = "block";
  updatePlayerPosition();
}

createGrid(gameContainer);
gameContainer.style.display = "none";
document.getElementById("hud").style.display = "none";
