'use strict'

/*
 * Approach inspired by React’s Component class
 */

class Details extends Component {
  constructor(props = {}) {
    super()
    this.elm = null
    this.state = {open: props.open || false}
    this.commands = {
      toggle: () => {
        this.setState({...this.state, open: !this.state.open})
      }
    }
    this.listeners = {
      toggle: () => {
        if (this.elm.open !== this.state.open) {
          this.setState({...this.state, open: this.elm.open})
        }
      }
    }
  }

  // Mount to the component element (method with side-effects)
  mount(elm) {
    if (!this.elm) {
      this.elm = elm
      this.elm.addEventListener('toggle', this.listeners.toggle)
    }
  }

  // Unmount from the component element (method with side-effects)
  unmount() {
    if (this.elm) {
      this.elm.removeEventListener('toggle', this.listeners.toggle)
      this.elm = null
    }
  }

  // Patch the component element (method with side-effects)
  patch() {
    if (this.elm) {
      this.elm.open = this.state.open
    }
  }

  // Render the component as HTML (impure method)
  html() {
    return `<details${this.state.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}
