export function getRandomTileType() {
  const rand = Math.random();

  if (rand < 0.05) return "gold";
  if (rand < 0.20) return "ore";
  if (rand < 0.25) return "void";  // 5% chance: missing tile
  return "dirt";
}
