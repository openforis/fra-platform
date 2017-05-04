import * as R from "ramda"
import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import createDebounce from "redux-debounced"

const initial = {
  msg: "hello",
  columns: {
    "FRA2005": {
      name: "FRA2005",
      value: 0
    },
    "FRA2010": {
      name: "FRA2010",
      value: 10
    },
    "FRA2015": {
      name: "FRA2015",
      value: 0
    }
  }
}

const actions = {
  'CHANGED_VALUE': (state, action) =>
    R.assocPath(['columns', action.name, 'value'], action.value, state),
  'CHANGE_START': (state, action) =>
    R.assocPath(['columns', action.name, 'value'], action.value, state),
}

let reducer = (state = initial, action) => {
  console.log("action", action)
  const actionHandler = actions[action.type]
  if (actionHandler) return actionHandler(state, action)
  return state
}

const store = createStore(reducer, applyMiddleware(createDebounce(),
  thunkMiddleware))

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('main')
  );
}

renderApp()
