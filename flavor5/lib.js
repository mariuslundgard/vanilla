'use strict'

/* Reusable code */

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
