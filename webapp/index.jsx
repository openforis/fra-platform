import * as R from "ramda"
import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

const initial = {
  msg: "hello",
  data: {
    "FRA2005": {
      name: "FRA2005",
      value: 0
    },
    "FRA2010": {
      name: "FRA2010",
      value: 10
    }
  }
}

const actions = {
  'CHANGED_VALUE': (state, action) =>
    R.assocPath(['data', action.name, 'value'], action.value, state),
  'CHANGE_START': (state, action) => ({...state})
}

let reducer = (state = initial, action) => {
  console.log("action", action)
  const actionHandler = actions[action.type]
  if (actionHandler) return actionHandler(state, action)
  return state
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('main')
  );
}

renderApp()
