// import R from 'ramda';
import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initial = {
  msg: "hello"
}

let reducer = (state=initial, action) => {
  return state
}

function renderApp() {
    ReactDOM.render(
        <Provider store={createStore(reducer)}>
          <Routes />
        </Provider>,
        document.getElementById( 'main' )
    );
}

renderApp()
