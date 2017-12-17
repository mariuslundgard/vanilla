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
    const modelSubject = createSubject()
    const toggleStream = fromEvent(elm, 'toggle')
    const openStream = map(toggleStream, () => elm.open)
    const modelStream = fold(openStream, (model, open) => ({...model, open}), initialState)
    const modelUnsubscribe = modelStream(modelSubject.next)

    const commands = {
      toggle: () => (elm.open = !elm.open)
    }

    const unmount = () => {
      modelUnsubscribe()
      modelSubject.destroy()
    }

    return {
      commands,
      subscribe: modelSubject.subscribe,
      unmount
    }
  },

  // Patch the component element (function with side-effects)
  patch(elm, model) {
    elm.open = model.open
  },

  // Render the component as HTML (pure function)
  html(model) {
    return `<details${model.open ? ' open' : ''}>
      <summary>Toggle me</summary>
      <div>
        <h1>Details component demo</h1>
      </div>
    </details>`
  }
}
