// js/game.js
import { createGrid, gridWidth, gridHeight } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';

let mineTimeout = null;

export function initGame() {
  const gameContainer = document.getElementById("game");
  const oreDisplay = document.getElementById("ore-count");

  // Reset state
  player.x = 75;
  player.y = 0;
  player.ore = 0;
  oreDisplay.textContent = "0";
  gameContainer.innerHTML = "";

  createGrid(gameContainer);
  updatePlayerPosition();
  centerCameraOnPlayer();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}
/* PLAYER POSITION & LAYERING START */
function updatePlayerPosition() {
  // Remove all existing .player overlays
  document.querySelectorAll(".player").forEach(el => el.remove());

  // Add player overlay to current tile
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    tile.appendChild(playerDiv);
  }
}

function centerCameraOnPlayer() {
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) {
    tile.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  }
}
/* PLAYER POSITION & LAYERING END */


function handleKeyDown(e) {
  if (e.repeat) return;

  switch (e.key) {
    case "ArrowUp":
      if (player.y > 0) player.y--;
      break;
    case "ArrowDown":
      if (player.y < gridHeight - 1) player.y++;
      break;
    case "ArrowLeft":
      if (player.x > 0) player.x--;
      break;
    case "ArrowRight":
      if (player.x < gridWidth - 1) player.x++;
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
  centerCameraOnPlayer();
}

function handleKeyUp(e) {
  if (e.key === " " && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }
}
