const btn = document.getElementById('fullscreen-btn');
const container = document.getElementById('game-container');

btn.addEventListener('click', () => {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  }
});