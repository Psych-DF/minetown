const gridSize = 40;
const gameContainer = document.getElementById("game");

// Generate grid data and DOM
const grid = [];
for (let y = 0; y < gridSize; y++) {
  for (let x = 0; x < gridSize; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.x = x;
    tile.dataset.y = y;
    gameContainer.appendChild(tile);
    grid.push(tile);
  }
}

// Player position
let playerX = 20;
let playerY = 0;
updatePlayerPosition();

// Movement
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  switch (e.key) {
    case "ArrowUp":
      if (playerY > 0) playerY--;
      break;
    case "ArrowDown":
      if (playerY < gridSize - 1) playerY++;
      break;
    case "ArrowLeft":
      if (playerX > 0) playerX--;
      break;
    case "ArrowRight":
      if (playerX < gridSize - 1) playerX++;
      break;
  }
  updatePlayerPosition();
});

// Mining
let mineTimeout = null;
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !mineTimeout) {
    mineTimeout = setTimeout(() => {
      mineTile(playerX, playerY);
      mineTimeout = null;
    }, 1000); // 1 second hold
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && mineTimeout) {
    clearTimeout(mineTimeout);
    mineTimeout = null;
  }
});

function updatePlayerPosition() {
  grid.forEach((tile) => tile.classList.remove("player"));
  const index = playerY * gridSize + playerX;
  grid[index].classList.add("player");
}

function mineTile(x, y) {
  const index = y * gridSize + x;
  const tile = grid[index];
  if (!tile.classList.contains("mined")) {
    tile.classList.add("mined");
    console.log(`Mined tile at (${x}, ${y})`);
  }
}
