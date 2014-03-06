var emailWindowEl = document.getElementById('sys-window-email');
var windowCol = document.querySelectorAll('.sys-window');
var homeWindowEl = document.getElementById('sys-window-home');
var windowsEl = document.getElementById('sys-windows');

var to = true;

window.addEventListener('click', function () {
  if (to) {
    windowsEl.classList.remove('state-to-app-from-home');
    windowsEl.classList.add('state-to-home');
  }
  else {
    windowsEl.classList.remove('state-to-home');
    windowsEl.classList.add('state-to-app-from-home');
  }

  to = !to;
});