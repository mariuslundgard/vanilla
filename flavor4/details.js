'use strict'

/*
 * Approach inspired by MVC
 */

class DetailsModel extends Model {
  setOpen(open) {
    this.setState({...this.state, open})
  }
}

class DetailsView {
  constructor(model) {
    this.model = model
    this.elm = null
  }

  setElement(elm) {
    this.elm = elm
  }

  patch(prevState) {
    if (prevState.open !== this.model.state.open) {
      this.elm.open = this.model.state.open
    }
  }

  html() {
    return `<details${this.model.state.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}

class DetailsController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.commands = {
      toggle: () => {
        const prevState = this.model.state
        this.model.setOpen(!prevState.open)
        this.view.patch(prevState)
      }
    }
    this.listeners = {
      toggle: () => {
        const prevState = this.model.state
        if (prevState.open !== this.view.elm.open) {
          this.model.setOpen(this.view.elm.open)
          this.view.patch(prevState)
        }
      }
    }
  }

  mount() {
    this.view.elm.addEventListener('toggle', this.listeners.toggle)
  }

  unmount() {
    this.view.elm.removeEventListener('toggle', this.listeners.toggle)
  }
}
