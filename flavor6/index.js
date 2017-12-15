'use strict'

/*
 * Approach inspired by MVC
 */

class DetailsModel extends Model {
  setOpen(open) {
    this.setState({...this.state, open})
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
