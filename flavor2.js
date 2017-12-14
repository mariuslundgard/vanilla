'use strict'

/*
 * Approach inspired by reactive programming (#1)
 */

function details(elm) {
  let observers = []
  let state = {open: elm.open}

  const handlers = {
    toggle: () => {
      const prevState = state
      state = {...state, open: elm.open}
      observers.forEach(observer => observer(state, prevState))
    }
  }

  const subscribe = observer => {
    observers.push(observer)
    // return unsubscribe function:
    return () => {
      const idx = observers.indexOf(observer)
      if (idx > -1) observers.splice(idx, 1)
    }
  }

  const toggle = () => (elm.open = !state.open)

  const unmount = () => {
    elm.removeEventListener('toggle', handlers.toggle)
    // garbage collection:
    observers = null
    state = null
  }

  elm.addEventListener('toggle', handlers.toggle)

  return {
    subscribe,
    toggle,
    unmount
  }
}
