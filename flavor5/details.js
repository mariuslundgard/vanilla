'use strict'

/*
 * Approach using functional reactive programming
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
    const stateSubject = createSubject()
    const toggleStream = fromEvent(elm, 'toggle')
    const openStream = map(toggleStream, () => elm.open)
    const stateStream = pairwise(fold(openStream, (state, open) => ({...state, open}), initialState))
    const stateUnsubscribe = stateStream(([prevState, state]) => stateSubject.next([state, prevState]))

    const commands = {
      toggle: () => (elm.open = !elm.open)
    }

    const unmount = () => {
      stateUnsubscribe()
      stateSubject.destroy()
    }

    return {
      commands,
      subscribe: stateSubject.subscribe,
      unmount
    }
  },

  // Patch the component element (function with side-effects)
  patch(elm, state, prevState) {
    if (state.open !== prevState.open) {
      elm.open = state.open
    }
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
