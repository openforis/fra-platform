import './i18n'

import '@client/styles/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './pages/PageRoutes'
import store from './store/store'

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
