// js/game.js
import { createGrid } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';
import { gridWidth, gridHeight } from './grid.js';

let mineTimeout = null;

export function initGame() {
  const gameContainer = document.getElementById("game");
  const oreDisplay = document.getElementById("ore-count");

  // Reset state
  player.x = 20;
  player.y = 0;
  player.ore = 0;
  oreDisplay.textContent = "0";
  gameContainer.innerHTML = "";

  createGrid(gameContainer);
  updatePlayerPosition();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

function updatePlayerPosition() {
  document.querySelectorAll(".player").forEach((el) => el.classList.remove("player"));
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) tile.classList.add("player");
}

function handleKeyDown(e) {
  if (e.repeat) return;

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
    case " ":
      if (!mineTimeout) {
        mineTimeout = setTimeout(() => {
          mineTile(player.x, player.y);
          mineTimeout = null;
        }, 1000);
      }
      break;
  }

  updatePlayerPosition();
}

function handleKeyUp(e) {
  if (e.key === " " && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }
}
