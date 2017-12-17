# vanilla

A collection of different ways of structuring vanilla JavaScript components.

## Common features of all flavors

* **Isomorphic.** Works on both the server (Node.js) and in the browser’s main thread.
* **Observable.** Provides a way to listen to state changes.
* **Immutable state.** The state is never mutated in place, which makes the components compatible with other paradigms that depend on immutability (such as optimized React components).

## Flavors

### [Flavor 1](flavor1/) – inspired by [@eirikbacker](https://github.com/eirikbacker)

| Pros                                                                                                                                                                                              | Cons                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| • **Few lines of code.** One function handles “everything” – initialization, state management, and DOM patching – resulting in little code.<br>• **Few abstractions.**<br>• **Close to the DOM**. | • **Magic.** One function that does “everything” complicates things and is hard to reason about.<br>• **Requires use of [_expandos_](https://developer.mozilla.org/en-US/docs/Glossary/Expando)**. Since `WeakMap` is not available in IE9. |

### [Flavor 2](flavor2/) – inspired by Elm and React (obsolete)

| Pros | Cons |
| ---- | ---- |
| —    | —    |

### [Flavor 3](flavor3/) – inspired by React’s Component class

| Pros                                               | Cons                                                                                                                                                                                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| • **Familiar structure** if already used to React. | • **Requires being aware of method bindings.** Using the `this` keyword can cause problems when combined with functional paradigms.<br>• **Inheritance.** Can cause unexpected behavior, and requires being familiar with base classes. |

### [Flavor 4](flavor4/) – inspired by Elm, React and Redux

| Pros | Cons |
| ---- | ---- |
| —    | —    |

### [Flavor 5](flavor5/) – inspired by MVC

| Pros                               | Cons                                                                                                                                                                                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| • **Familiar** and well-discussed. | • **Old and unsexy.** Hard to bring on new developers who want to try shinier things.<br>• **Open to interpretation.** Developers interpret MVC in many different ways, leading to inconsisitencies and “spaghetti” code.<br>• **Many abstractions.** |

### [Flavor 6](flavor6/) – using functional reactive programming

| Pros                                                                                                                                                                | Cons                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| • **Expressive**. Declarative state management makes asynchronous dataflows easier to reason about.<br>• **Fully reactive**.<br>• **Relatively few lines of code.** | • **Learning curve.** Functional reactive programming is a relatively new paradigm, which takes time to learn. |

> NOTE: In the not-so-far future [the `Observable` might become a part of the DOM’s Event API](https://github.com/whatwg/dom/issues/544).
