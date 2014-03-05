// App
// -----------------------------------------------------------------------------

function app() {
  var emailWindowEl = document.getElementById('sys-window-email');
  var homeWindowEl = document.getElementById('sys-window-home');
  var windowsEl = document.getElementById('sys-windows');

  var to = true;
  window.addEventListener('click', function () {
    if (to) {
      windowsEl.classList.remove('sys-animate-from-home');
      windowsEl.classList.add('sys-animate-to-home');
    }
    else {
      windowsEl.classList.remove('sys-animate-to-home');
      windowsEl.classList.add('sys-animate-from-home');
    }

    to = !to;
  });
}

app();