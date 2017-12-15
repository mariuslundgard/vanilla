'use strict'

/*
 * Approach inspired by functional reactive programming.
 */

const fromEvent = (elm, type) => next => {
  elm.addEventListener(type, next)
  return () => elm.removeEventListener(type, next)
}

const map = (source, f) => next => source(value => next(f(value)))

const fold = (source, f, initialValue) => {
  let acc = initialValue
  return next => source(value => next((acc = f(acc, value))))
}

const createSubject = () => {
  let observers = []

  const destroy = () => (observers = null)

  const next = value => observers.forEach(observer => observer(value))

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
    next,
    subscribe
  }
}

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
