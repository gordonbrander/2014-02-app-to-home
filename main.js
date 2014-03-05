// Create an events function containing all DOM events of `name` on `element`.
// Returns an event function.
function on(element, name, useCapture) {
  // Note that each call to resulting event function will attach a new listener.
  // If you want to share a single listener between multiple consumers,
  // transform `eventsOnDomEvents` with `hub()`.
  return (function eventsOnDomEvents(next) {
    element.addEventListener(name, next, !!useCapture);
  });
}

function filter(events, predicate) {
  return (function eventsFiltered(next) {
    events(function nextFilter(value) {
      if (predicate(v)) next(value);
    });
  });
}

// Hub a source event so it is only consumed once. Occurances of original event
// will be dispatched to every callback.
// 
// Note that callbacks added after event consumption starts will miss
// earlier events.
function hub(events) {
  var nexts = [];
  var isStarted = false;

  return (function eventsHubbed(next) {
    nexts.push(next);

    // Kick off source event if not done yet.
    if (!isStarted) {
      events(function nextDispatchToHub(value) {
        nexts.reduce(callWith, value);
      });

      isStarted = true;
    }
  });
}


// Helpers
// -----------------------------------------------------------------------------

function withEventAnimationName(name) {
  function isEventAnimationName(event) {
    return event.animationName === name;
  }
  return isEventAnimationName;
}

function withEventTarget(element) {
  function isEventTarget(event) {
    return event.target === element;
  }
  return isEventTarget;
}

// App
// -----------------------------------------------------------------------------

function app() {
  var emailWindowEl = document.getElementById('sys-window-email');
  var homeWindowEl = document.getElementById('sys-window-home');
  var windowsEl = document.getElementById('sys-windows');

  var clicks = on(window, 'click');
  var animationends = on(window, 'animationend');

  clicks(function () {
    windowsEl.classList.add('sys-animate-to-home');
  });
}

app();