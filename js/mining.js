import { getTile } from './grid.js';
import { player } from './player.js';

function getMiningProperties(type) {
  switch (type) {
    case "dirt": return { time: 100, reward: 1 };
    case "ore": return { time: 1000, reward: 1 };
    case "gold": return { time: 2000, reward: 1 };
    default: return { time: 1000, reward: 0 };
  }
}

export function mineTile(x, y) {
  const tile = getTile(x, y);
  if (!tile || tile.dataset.mined === "true") return;

  const type = tile.dataset.type;
  const { time, reward } = getMiningProperties(type);

  tile.classList.add("mining");

  requestAnimationFrame(() => {
    setTimeout(() => {
      tile.dataset.mined = "true";
      tile.classList.remove("mining");
      tile.classList.add("mined");

  if (type === "gold") {
  player.gold += reward;
  document.getElementById("gold-count").textContent = player.gold;
} else {
  player.ore += reward;
  document.getElementById("ore-count").textContent = player.ore;
}

      console.log(`Mined ${type}. +${reward} ${type === "gold" ? "gold" : "ore"}.`);
    }, time);
  });
}
