// js/mining.js
import { player } from './player.js';
import { getTile } from './grid.js';
/**/
export function mineTile(x, y) {
  const tile = getTile(x, y);
  if (tile.dataset.mined === "true") return;

  tile.dataset.mined = "true";
  tile.classList.add("mined");

  const tileType = tile.dataset.type;

  if (tileType === "ore") {
    player.ore += 1;
    tile.style.background = "#4dd";
    document.getElementById("ore-count").textContent = player.ore;
    console.log("Mined ore! Total:", player.ore);
  } else {
    tile.style.background = "#222";
  }
function getMiningProperties(type) {
  switch (type) {
    case "dirt":
      return { time: 500, reward: 0 };
    case "ore":
      return { time: 1000, reward: 1 };
    case "gold":
      return { time: 2000, reward: 5 };
    default:
      return { time: 1000, reward: 0 };
  }
}
