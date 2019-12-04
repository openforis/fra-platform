import './app-styles/style.less'
import './ckEditor/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppCountryView from "./app/appCountryView"

import * as loginStatusChecker from './user/loginStatusChecker'
import store from './state/store'

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppCountryView />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main'),
  )
}

renderApp()
loginStatusChecker.startPeriodicCheck(60 * 1000)
