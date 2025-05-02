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

let moveInterval = null;
let heldDirection = null;

function movePlayer(key) {
  switch (key) {
    case "arrowup":
    case "w":
      if (player.y > 0) player.y--;
      break;
    case "arrowdown":
    case "s":
      if (player.y < gridHeight - 1) player.y++;
      break;
    case "arrowleft":
    case "a":
      if (player.x > 0) player.x--;
      break;
    case "arrowright":
    case "d":
      if (player.x < gridWidth - 1) player.x++;
      break;
  }

  updatePlayerPosition();
  centerCameraOnPlayer();
}

function handleKeyDown(e) {
  const key = e.key.toLowerCase();

  // Prevent stacking intervals or repeats
  if (e.repeat || moveInterval) return;

  // Only react to movement keys
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    heldDirection = key;
    movePlayer(heldDirection); // 👈 move once immediately
    moveInterval = setInterval(() => {
      movePlayer(heldDirection);
    }, 200); // then continue stepping
  }

  // Mining still works
  if (key === " ") {
    if (!mineTimeout) {
      mineTimeout = setTimeout(() => {
        mineTile(player.x, player.y);
        mineTimeout = null;
      }, 1000);
    }
  }
}

function handleKeyUp(e) {
  if (e.key.toLowerCase() === heldDirection) {
    clearInterval(moveInterval);
    moveInterval = null;
    heldDirection = null;
  }

  if (e.key === " " && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }

}

