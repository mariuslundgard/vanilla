'use strict'

/* Reusable code */

const fromEvent = (elm, type) => next => {
  elm.addEventListener(type, next)
  return () => elm.removeEventListener(type, next)
}

const map = (source, f) => next => source(value => next(f(value)))

const fold = (source, f, initialValue) => {
  let acc = initialValue
  return next => source(value => next((acc = f(acc, value))))
}

const pairwise = source => next => {
  let i = 0
  let prevValue
  return source(value => {
    i += 1
    if (i > 1) {
      next([prevValue, value])
    }
    prevValue = value
  })
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
