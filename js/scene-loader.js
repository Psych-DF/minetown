// scene-loader.js
// This script handles loading and switching between scenes

let currentScene = "start-screen"; // Track the current scene

// Load a scene into the #app div
export async function loadScene(sceneName) {
  try {
    const res = await fetch(`scenes/${sceneName}.html`);
    if (!res.ok) throw new Error(`Scene ${sceneName} not found`);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;
    currentScene = sceneName;
    console.log(`Loaded scene: ${sceneName}`);
  } catch (err) {
    console.error(err);
    document.getElementById("app").innerHTML = `<p style="color:red;">Failed to load scene: ${sceneName}</p>`;
  }
}

// Handle keypresses to move between scenes
async function handleKeyPress(e) {
  if (e.key === "Enter") {
    if (currentScene === "start-screen") {
      await loadScene("game-play-screen");
      // Optional: Call game setup logic here if needed
    } else if (currentScene === "game-over-screen") {
      await loadScene("start-screen");
    }
  }
}

// Initialize when page loads
async function init() {
  await loadScene("start-screen");
  document.addEventListener("keydown", handleKeyPress);
}

init();
