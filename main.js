var emailWindowEl = document.getElementById('sys-window-email');
var windowCol = document.querySelectorAll('.sys-window');
var homeWindowEl = document.getElementById('sys-window-home');
var windowsEl = document.getElementById('sys-windows');

var to = true;

window.addEventListener('click', function () {
  if (to) {
    windowsEl.classList.remove('anim-to-app-from-home');
    windowsEl.classList.add('anim-to-home');
  }
  else {
    windowsEl.classList.remove('anim-to-home');
    windowsEl.classList.add('anim-to-app-from-home');
  }

  to = !to;
});