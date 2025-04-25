// js/grid.js
import { getRandomTileType } from './tileTypes.js';

export const grid = [];
export const gridSize = 40;

export function createGrid(container) {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
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
  const index = y * gridSize + x;
  return grid[index];
}
