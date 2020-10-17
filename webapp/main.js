import '@webapp/main/styles/style.less'
import '@webapp/components/ckEditor/style.less'

import '@webapp/utils/polyfill/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from './main/Routes'
import store from './main/store'

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main')
  )
}

renderApp()
