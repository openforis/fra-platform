import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer'
import LoginView from './components/loginView'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

function renderApp () {

  ReactDOM.render(
    <Provider store={store}>
      <LoginView/>
    </Provider>,
    document.getElementById('main')
  )
}

renderApp()
