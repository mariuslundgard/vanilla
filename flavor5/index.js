'use strict'

/*
 * Approach inspired by React
 */

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
