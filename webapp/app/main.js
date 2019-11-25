import '../app-styles/style.less'
import '../ckEditor/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import Page from './routes'
import { Provider } from 'react-redux'
import * as loginStatusChecker from '../user/loginStatusChecker'

import store from '../state/store'

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
