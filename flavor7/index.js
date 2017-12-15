'use strict'

/*
 * Approach inspired by functional reactive programming.
 */

const details = elm => {
  const toggleStream = fromEvent(elm, 'toggle')

  const openStream = map(toggleStream, () => elm.open)

  const stateStream = fold(openStream, (state, open) => ({...state, open}), {open: elm.open})

  let subject = createSubject()

  const stateUnsubscribe = stateStream(subject.next)

  const toggle = () => (elm.open = !elm.open)

  const unmount = () => {
    stateUnsubscribe()
    subject.destroy()
    subject = null
  }

  return {
    subscribe: subject.subscribe,
    toggle,
    unmount
  }
}
