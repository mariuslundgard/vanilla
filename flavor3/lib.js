'use strict'

class Component {
  constructor() {
    this.observers = []
    this.state = null
  }

  setState(newState) {
    const prevState = this.state
    this.observers.forEach(observer => observer(newState, prevState))
    this.state = newState
    this.patch(prevState)
  }

  subscribe(observer) {
    this.observers.push(observer)
    // return unsubscribe function:
    return () => {
      const idx = this.observers.indexOf(observer)
      if (idx > -1) this.observers.splice(idx, 1)
    }
  }

  patch() {}
}
