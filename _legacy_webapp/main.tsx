import './/main/styles/style.less'
import './/components/ckEditor/style.less'

import './/utils/polyfill/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import PageRoutes from './pages/PageRoutes'
import store from './store/store'
import './i18n'

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
