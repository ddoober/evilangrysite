const overlay = document.getElementById('warning-overlay');
const accept = document.getElementById('accept-warning');
const deny = document.getElementById('deny-warning');

// Prevent background scroll while overlay is visible
document.body.style.overflow = 'hidden';

accept.addEventListener('click', () => {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
  // return focus to page
  document.querySelector('main').focus?.();
});

deny.addEventListener('click', () => {
  window.location.href = "/";
});
