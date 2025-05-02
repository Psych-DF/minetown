// js/grid.js
import { getRandomTileType } from './tileTypes.js';

export const grid = [];
export const gridWidth = 150;
export const gridHeight = 50;

export function createGrid(container) {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.dataset.type = getRandomTileType();
      tile.dataset.mined = "false";
      container.appendChild(tile);
      grid.push(tile);
    }
  }
}

export function getTile(x, y) {
  const index = y * gridWidth + x;
  return grid[index];
}
