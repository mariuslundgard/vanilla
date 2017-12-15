'use strict'

/* Reusable code */

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
