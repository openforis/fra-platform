import '../app-styles/style.less'
import '../ckEditor/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import Page from './routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createDebounce from 'redux-debounced'
import reducer from './rootReducer'
import * as loginStatusChecker from '../user/loginStatusChecker'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middleware = [createDebounce(), thunkMiddleware]
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const store = createStore(reducer, enhancer);

function renderApp () {

  ReactDOM.render(
    <Provider store={store}>
      <Page/>
    </Provider>,
    document.getElementById('main')
  )
}

renderApp()
loginStatusChecker.startPeriodicCheck(60*1000)
