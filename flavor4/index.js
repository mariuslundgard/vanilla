'use strict'

/*
 * Approach inspired by reactive programming (#3) and Redux
 */

function details(elm) {
  const {destroy, getState, patch, subscribe} = createStore({open: elm.open})

  const handlers = {
    toggle: () => patch(state => ({...state, open: elm.open}))
  }

  const toggle = () => (elm.open = !getState().open)

  const unmount = () => {
    elm.removeEventListener('toggle', handlers.toggle)
    destroy()
  }

  elm.addEventListener('toggle', handlers.toggle)

  return {
    subscribe,
    toggle,
    unmount
  }
}
