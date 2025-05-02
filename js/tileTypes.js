export function getRandomTileType() {
  const rand = Math.random();

  if (rand < 0.05) return "gold";
  if (rand < 0.20) return "ore";
  return "dirt";
}
