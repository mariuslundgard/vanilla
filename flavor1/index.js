'use strict'

/*
 * Approach inspired by Eirik Backer
 */

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
