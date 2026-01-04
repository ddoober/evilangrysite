const soundEffectLeft = new Audio("/lilguyleft.opus");
const soundEffectRight = new Audio("/lilguyright.opus");
let side = 0;
let audioPermissions = false;

function lilguygo() {
  const guy = document.getElementById("lilguy");
  const guybox = document.getElementById("lilguy-box");

  const width = window.innerWidth;
  const height = window.innerHeight;

  let x = null;
  let y = null;
  let scaleX = null;
  let audio = null;

  switch(side) {
    case 1:
      audio = soundEffectRight;
      scaleX = 1;
      x = -100;
      y = Math.floor(Math.random() * height);

      side = 0

      break;
    case 0:
      audio = soundEffectLeft;
      scaleX = -1;
      x = width + 100;
      y = Math.floor(Math.random() * height);

      side = 1

      break;
  }

  guybox.style.transform = `translate(${x}px, ${y}px)`;
  guy.style.transform = `scaleX(${scaleX})`;

  if (audioPermissions) {
    audio.fastSeek(0);
    audio.play();
  }
}

function initializeSounds() {
  if (audioPermissions) return;

  console.log("audio permissions granted");
  audioPermissions = true;
}


function run_lilguy() {
  lilguygo()

  setTimeout(() => {
    run_lilguy()
  }, Math.random() * 40000);
}

setTimeout(() => {
  run_lilguy()
}, Math.random() * 40000);

document.addEventListener("click", initializeSounds, { once: true });
document.addEventListener("keydown", initializeSounds, { once: true });
