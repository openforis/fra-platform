import '@webapp/main/styles/style.less'
import '@webapp/components/ckEditor/style.less'

import '@webapp/utils/polyfill/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './pages/PageRoutes'
import store from './main/store'

const Main = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main')
  )
}

Main()
