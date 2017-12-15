'use strict'

/* Reusable code */

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
