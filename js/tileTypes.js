// js/tileTypes.js
export function getRandomTileType() {
  const rand = Math.random();
  return rand < 0.2 ? 'ore' : 'dirt'; // 20% ore
}
