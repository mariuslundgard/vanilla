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

  setState(newState) {
    this.observers.forEach(observer => observer(newState, this.state))
    this.state = newState
  }

  handleToggle() {
    this.setState({...this.state, open: this.elm.open})
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
