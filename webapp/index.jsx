// import R from 'ramda';
import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initial = {
  msg: "hello"
}

const actions = {'CHANGE_MSG': (state, action) => ({...state, msg: action.newMsg})}

let reducer = (state=initial, action) => {
    const actionHandler = actions[action.type]
    if (actionHandler) return actionHandler(state, action)
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
