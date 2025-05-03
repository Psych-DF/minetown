// js/game.js
import { createGrid, gridWidth, gridHeight } from './grid.js';
import { player } from './player.js';
import { mineTile } from './mining.js';
import { getTile } from './grid.js';


let mineTimeout = null;

/* PLAYER SPAWN LOGIC*/
function findSpawnTile() {
  const y = 50; // fixed row
  for (let x = 0; x < gridWidth; x++) {
    const tile = getTile(x, y);
    if (tile && tile.dataset.type === "gold") {
      player.x = x;
      player.y = y;
      return;
    }
  }
}

/* PLAYER SPAWN LOGIC*/

export function initGame() {
  const gameContainer = document.getElementById("game");
  const oreDisplay = document.getElementById("ore-count");

  // Reset player state
  player.diamond = 0;
  player.gold = 0;
  player.silver = 0;
  player.ore = 0;
  player.stone = 0;
  player.clay = 0;
  player.bone = 0;
  player.dirt = 0;
  player.rock = 0;

  oreDisplay.textContent = "0";
  gameContainer.innerHTML = "";

  createGrid(gameContainer);

  findSpawnTile(); // 🧠 call the spawn logic here
  updatePlayerPosition();
  centerCameraOnPlayer();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

/* PLAYER MOVEMENT CONTROLS */

let moveInterval = null;
let heldDirection = null;

function movePlayer(key) {
  let newX = player.x;
  let newY = player.y;

  switch (key) {
    case "arrowup":
    case "w":
      newY--;
      break;
    case "arrowdown":
    case "s":
      newY++;
      break;
    case "arrowleft":
    case "a":
      newX--;
      break;
    case "arrowright":
    case "d":
      newX++;
      break;
  }

  const nextTile = getTile(newX, newY);
  if (!nextTile || nextTile.dataset.type === "rock") return; // ⛔️ Block movement

  player.x = newX;
  player.y = newY;
  updatePlayerPosition();
  centerCameraOnPlayer();
}


/* PLAYER HOLD BUTTON MOVEMENT CONTROLS */

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
    }, 250); // then continue stepping
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

