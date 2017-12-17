'use strict'

/*
 * Approach inspired by Eirik Backer
 */

const details = {
  getStateAndOrPatch(elm, props = {}) {
    let state = elm ? getState(elm) || {open: elm.open} : {open: props.open || false}

    // patch element and state
    if (elm) {
      if (state.ontoggle !== props.ontoggle) {
        state = {...state, ontoggle: props.ontoggle}
        elm.ontoggle = () => {
          state = {...getState(elm), open: elm.open}
          setState(elm, state)
          if (props.ontoggle) props.ontoggle(state)
        }
      }
      if (state.open !== props.open) {
        state = {...state, open: props.open}
        elm.open = state.open
      }
      setState(elm, state)
    }

    return state
  },

  unmount(elm) {
    clearState(elm)
    elm.ontoggle = null
  },

  html(state) {
    return `<details${state.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}
