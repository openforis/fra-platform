import './app-styles/style.less'
import './ckEditor/style.less'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRouterSwitch from './app/appRouterSwitch'

import * as loginStatusChecker from './user/loginStatusChecker'
import store from './state/store'

function renderApp () {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppRouterSwitch/>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main'),
  )
}

renderApp()
loginStatusChecker.startPeriodicCheck(60 * 1000)
