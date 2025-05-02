// js/game.js
import { createGrid, gridWidth, gridHeight } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';

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
  centerCameraOnPlayer();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

function updatePlayerPosition() {
  // Remove old player marker
  document.querySelectorAll(".player").forEach((el) => el.classList.remove("player"));

  // Add .player class to the tile the player is on
  const tile = document.querySelector(`.tile[data-x="${player.x}"][data-y="${player.y}"]`);
  if (tile) tile.classList.add("player");
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

/* PLAYER MOVEMENT CONTROLS */
function handleKeyDown(e) {
  if (e.repeat) return;

  switch (e.key) {
    case "ArrowUp":
        case "w":
        case "W":
      if (player.y > 0) player.y--;
      break;
    case "ArrowDown":
        case "s":
        case "S":
      if (player.y < gridHeight - 1) player.y++;
      break;
    case "ArrowLeft":
        case "a":
        case "A":
      if (player.x > 0) player.x--;
      break;
    case "ArrowRight":
        case "d":
        case "D":
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
