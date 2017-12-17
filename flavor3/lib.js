'use strict'

class Component {
  constructor() {
    this.observers = []
    this.state = null
  }

  setState(newState) {
    this.observers.forEach(observer => observer(newState, this.state))
    this.state = newState
    this.patch()
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
