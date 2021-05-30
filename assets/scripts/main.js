const DOM = {
  body: document.querySelector('body'),
  header: document.querySelector('#header'),
  main: document.querySelector('main'),

  bodyPreLoad() {
    DOM.body.classList.contains('is-preload') ? DOM.body.classList.remove('is-preload') : ''
  },

  scrollTrigger() {
    const mainTriggerTop = DOM.main.getBoundingClientRect().top

    DOM.header.offsetHeight > mainTriggerTop ? DOM.header.classList.add('active') : DOM.header.classList.remove('active')
  },

  toggleMenu() {
    DOM.body.classList.toggle('menu-active')
  }
}

window.addEventListener('load', () => {
  DOM.bodyPreLoad()
  DOM.scrollTrigger()
})
window.addEventListener('scroll', DOM.scrollTrigger)
