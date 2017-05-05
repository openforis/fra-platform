import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import createDebounce from "redux-debounced"

import reducer from "./rootReducer"


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
