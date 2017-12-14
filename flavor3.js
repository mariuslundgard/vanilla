'use strict'

/*
 * Approach inspired by reactive programming (#2)
 */

class Details {
  constructor(elm) {
    this.elm = elm
    this.state = {open: elm.open}
    this.observers = []
    this.handleToggle = this.handleToggle.bind(this)
    this.elm.addEventListener('toggle', this.handleToggle)
  }

  handleToggle() {
    const prevState = this.state
    this.state = {...this.state, open: this.elm.open}
    this.observers.forEach(observer => observer(this.state, prevState))
  }

  toggle() {
    this.elm.open = !this.state.open
  }

  subscribe(observer) {
    this.observers.push(observer)
    return () => {
      const idx = this.observers.indexOf(observer)
      if (idx > -1) this.observers.splice(idx, 1)
    }
  }

  unmount() {
    this.elm.removeEventListener('toggle', this.handleToggle)
    this.elm = null
    this.state = null
    this.observers = null
    this.handleToggle = null
  }
}
