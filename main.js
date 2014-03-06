var screenEl = document.getElementById('sys-screen');

var to = true;

window.addEventListener('click', function () {
  if (to) {
    screenEl.classList.remove('state-to-app-from-home');
    screenEl.classList.add('state-to-home');
  }
  else {
    screenEl.classList.remove('state-to-home');
    screenEl.classList.add('state-to-app-from-home');
  }

  to = !to;
});