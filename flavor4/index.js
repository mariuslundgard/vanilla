'use strict'

/*
 * Approach inspired by reactive programming (#3) and Redux
 */

const createStore = initialState => {
  let state = initialState
  let observers = []

  const destroy = () => {
    observers = null
    state = null
  }

  const getState = () => state

  const patch = f => {
    const newState = f(state)
    observers.forEach(observer => observer(newState, state))
    state = newState
  }

  const subscribe = observer => {
    observers.push(observer)
    // return unsubscribe function:
    return () => {
      const idx = observers.indexOf(observer)
      if (idx > -1) observers.splice(idx, 1)
    }
  }

  return {
    destroy,
    getState,
    patch,
    subscribe
  }
}

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
