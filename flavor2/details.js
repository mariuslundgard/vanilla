'use strict'

/*
 * Approach inspired by Elm and functional reactive programming
 */

const details = {
  // Initialize the component model (pure function)
  init(props) {
    return {
      open: props.open || false
    }
  },

  // Mount the component to a DOM element (function with side-effects)
  mount(elm, initialState) {
    const observers = []

    let state = initialState

    const setState = newState => {
      observers.forEach(observer => observer(newState, state))
      state = newState
    }

    const listeners = {
      toggle: () => {
        if (state.open !== elm.open) setState({...state, open: elm.open})
      }
    }

    elm.addEventListener('toggle', listeners.toggle)

    return {
      commands: {
        toggle: () => setState({...state, open: !state.open})
      },
      subscribe(observer) {
        observers.push(observer)
        // return unsubscribe function:
        return () => {
          const idx = observers.indexOf(observer)
          if (idx > -1) observers.splice(idx, 1)
        }
      },
      unmount() {
        elm.removeEventListener('toggle', listeners.toggle)
      }
    }
  },

  // Patch the component element (function with side-effects)
  patch(elm, model) {
    elm.open = model.open
  },

  // Render the component model to an HTML string representation (pure function)
  html(model) {
    return `<details${model.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}
