'use strict'

/*
 * Approach inspired by React
 */

class Component {
  constructor() {
    this.observers = []
  }

  setState(newState) {
    this.observers.forEach(observer => observer(newState, this.state))
    this.state = newState
  }

  subscribe(observer) {
    this.observers.push(observer)
    // return unsubscribe function:
    return () => {
      const idx = this.observers.indexOf(observer)
      if (idx > -1) this.observers.splice(idx, 1)
    }
  }

  destroy() {
    this.state = null
    this.observers = null
  }
}

class Details extends Component {
  constructor(elm) {
    super()
    this.elm = elm
    this.state = {open: elm.open}
    this.handleToggle = this.handleToggle.bind(this)
    this.elm.addEventListener('toggle', this.handleToggle)
  }

  handleToggle() {
    this.setState({...this.state, open: this.elm.open})
  }

  toggle() {
    this.elm.open = !this.state.open
  }

  unmount() {
    this.elm.removeEventListener('toggle', this.handleToggle)
    this.elm = null
    this.handleToggle = null
    this.destroy()
  }
}
