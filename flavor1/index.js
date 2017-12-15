'use strict'

/*
 * Approach inspired by Eirik Backer
 */

const stateMap = new WeakMap()

function getState(ref) {
  return stateMap.get(ref)
}

function setState(ref, state) {
  return stateMap.set(ref, state)
}

function clearState(ref) {
  stateMap.delete(ref)
}

function details(elm, newState) {
  let state = getState(elm) || {open: elm.open}

  if (newState) {
    elm.ontoggle = () => {
      state = {...getState(elm), open: elm.open}
      setState(elm, state)
      if (newState.ontoggle) newState.ontoggle(state)
    }

    if (newState.open !== undefined && newState.open !== state.open) {
      elm.open = newState.open
    }

    state = {...state, ...newState}

    setState(elm, state)
  }

  return state
}

function detailsUnmount(elm) {
  clearState(elm)
  delete elm.ontoggle
}
