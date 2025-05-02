// js/tileTypes.js
export function getRandomTileType() {
  const rand = Math.random();

  if (rand < 0.05) return "gold";       // rare, big reward
  if (rand < 0.25) return "ore";        // common reward
  return "dirt";                        // basic tile
}
