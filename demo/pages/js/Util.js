(function () {
  function zoomHelper(selector) {
    return new Fn(selector);
  }
  function Fn(selector) {
    let elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
    this.length = elements.length;
  }
  Fn.prototype = {
    constructor: Fn,
    enabled() {
      for (let i = 0; i < this.length; i++) {
        this[i].classList.remove('button-disabled')
        this[i].disabled = false
      }
    },
    disabled() {
      for (let i = 0; i < this.length; i++) {
        this[i].classList.add('button-disabled')
        this[i].disabled = 'disabled'
      }
    },
    addEventListener(key, event) {
      for (let i = 0; i < this.length; i++) {
        this[i].addEventListener(key, event)
      }
    }
  }
  window.$ = window.zoomHelper = zoomHelper;
})()
