'use strict'

/*
 * Approach inspired by MVC
 */

class DetailsModel {
  constructor(state) {
    this.state = state
    this.observers = []
  }

  setOpen(open) {
    const newState = {...this.state, open}
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
}

DetailsModel.fromElement = elm => new DetailsModel({open: elm.open})

class DetailsController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.handleToggle = this.handleToggle.bind(this)
    this.view.addEventListener('toggle', this.handleToggle)
  }

  handleToggle() {
    this.model.setOpen(this.view.open)
  }

  toggle() {
    this.view.open = !this.model.state.open
  }

  unmount() {
    this.view.removeEventListener('toggle', this.handleToggle)
    this.handleToggle = null
    this.model = null
    this.view = null
  }
}
