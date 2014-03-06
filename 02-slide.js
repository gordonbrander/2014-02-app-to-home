// Minimal signal flow
// -----------------------------------------------------------------------------

// Push a value to an array as a side-effect. Returns value.
function add(array, value) {
  array.push(value);
  return value;
}

// Call function with non-null value as side-effect. Returns value.
function callWith(value, f) {
  f(value);
  return value;
}

// Invoke every function in an array of functions with value as side effect.
// Returns value.
function invoke(fns, value) {
  return fns.reduce(callWith, value);
}

// Intercept wire `a` with `assemble`, allowing values to be transformed and
// forwarded to wire `z`. Returns `z`.
function transform(a, xform) {
  var z = [];
  // On state, call `xform with z and value`. Note that if upstream wire `a`
  // has a null state, `xform` will not be called until a state is set for `a`.
  add(a, function onStateTransform(value) {
    xform(z, value);
  });
  return z;
}

function filter(a, predicate) {
  return transform(a, function transformFilter(z, value) {
    if (predicate(value)) invoke(z, value);
  });
}

function on(element, name, useCapture) {
  var z = [];

  element.addEventListener(name, function onEvent(event) {
    invoke(z, event);
  }, !!useCapture);

  return z;
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
  var elements = {
    emailWindow: document.getElementById('sys-window-email'),
    homeWindow: document.getElementById('sys-window-home'),
    windows: document.getElementById('sys-windows')
  };

  var kickoffs = on(window, 'click');
  var animationends = on(window, 'animationend');

  var zoomOutEnds = filter(animationends, withEventAnimationName('sys-zoom-out'));
  var zoomInEnds = filter(animationends, withEventAnimationName('sys-zoom-in'));
  var bumpRtlEnds = filter(animationends, withEventAnimationName('sys-bump-rtl'));

  add(kickoffs, function () {
    elements.homeWindow.classList.add('sys-window-zoomed-out');
    elements.emailWindow.classList.add('sys-window-zoom-out');
  });

  add(zoomOutEnds, function () {
    elements.windows.classList.add('sys-windows-bump-rtl');
  });

  add(bumpRtlEnds, function () {
    elements.homeWindow.classList.add('sys-window-zoom-in');
  });
}

app();