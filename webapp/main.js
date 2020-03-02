import '@webapp/main/styles/style.less'
import '@webapp/components/ckEditor/style.less'

import '@webapp/utils/polyfill/polyfill'

import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from '@webapp/main/routes'

import store from './state/store'

function renderApp () {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main'),
  )
}

renderApp()
