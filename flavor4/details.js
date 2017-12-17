'use strict'

/*
 * Approach inspired by reactive programming (#3) and Redux
 */

const details = {
  // Initialize the component state (pure function)
  init(props = {}) {
    return {
      open: props.open || false
    }
  },

  // Mount the component to the DOM (function with side-effects)
  mount(elm, initialState) {
    const {getState, patch, subscribe} = createStore(initialState)

    const listeners = {
      toggle: () => {
        if (elm.open !== getState().open) {
          patch(state => ({...state, open: elm.open}))
        }
      }
    }

    const commands = {
      toggle: () => patch(state => ({...state, open: !state.open}))
    }

    const unmount = () => {
      elm.removeEventListener('toggle', listeners.toggle)
    }

    elm.addEventListener('toggle', listeners.toggle)

    return {
      commands,
      subscribe,
      unmount
    }
  },

  // Patch the component element (function with side-effects)
  patch(elm, state) {
    elm.open = state.open
  },

  // Render the component as HTML (pure function)
  html(state) {
    return `<details${state.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}
