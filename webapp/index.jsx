// import R from 'ramda';
import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const initial = {
  msg: "hello"
}

const actions = {
  'CHANGE_MSG': (state, action) => ({...state, msg: action.newMsg, _debug: "msg"}),
  'CHANGE_START': (state, action) => ({...state, _debug: "start"})
}

let reducer = (state=initial, action) => {
    console.log("action", action)
    const actionHandler = actions[action.type]
    if (actionHandler) return actionHandler(state, action)
    return state
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// store.subscribe(() => console.log(store.getState()))

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
          <Routes />
        </Provider>,
        document.getElementById( 'main' )
    );
}

renderApp()
