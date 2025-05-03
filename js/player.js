// js/player.js
/* IMPORTS */
import { getTile } from './grid.js';
/* IMPORTS */
export const player = {
  x: 0,
  y: 0,
  diamond: 0,
  gold: 0,
  silver: 0,
  ore: 0,
  stone: 0,
  clay: 0,
  bone: 0,
  dirt: 0,
  rock: 0,
};

export function findSpawnTile() {
  for (let x = 0; x < 500; x++) {
    const tile = getTile(x, 50); // scan across row 50
    if (tile && tile.dataset.type === "dirt") {
      player.x = x;
      player.y = 50;
      return;
    }
  }
}
