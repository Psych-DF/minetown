export function getRandomTileType() {
  const rand = Math.random();

  if (rand < 0.02) return "diamond";   // 2%
  if (rand < 0.07) return "gold";      // 5%
  if (rand < 0.15) return "silver";    // 8%
  if (rand < 0.25) return "ore";       // 10%
  if (rand < 0.40) return "stone";     // 15%
  if (rand < 0.55) return "clay";      // 15%
  if (rand < 0.70) return "bone";      // 15%
  if (rand < 0.90) return "dirt";      // 20%
  return "rock";                       // 10%
}
