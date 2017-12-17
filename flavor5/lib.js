'use strict'

/* Reusable code */

class Model {
  constructor(state) {
    this.state = state
    this.observers = []
  }

  setState(state) {
    this.observers.forEach(observer => observer(state, this.state))
    this.state = state
  }

  subscribe(observer) {
    this.observers.push(observer)
    // return unsubscribe function:
    return () => {
      const idx = this.observers.indexOf(observer)
      if (idx > -1) this.observers.splice(idx, 1)
    }
  }
}
