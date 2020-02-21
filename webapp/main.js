import '@webapp/app-styles/style.less'
import '@webapp/components/ckEditor/style.less'

import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRouterSwitch from '@webapp/app/appRouterSwitch'

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
