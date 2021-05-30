const DOM = {
  body: document.querySelector('body'),

  bodyPreLoad() {
    DOM.body.classList.contains('is-preload') ? DOM.body.classList.remove('is-preload') : ''
  }
}

window.onload = function() {
  DOM.bodyPreLoad()
}