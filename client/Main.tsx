// import '@client/styles/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store'
import PageRoutes from './pages/PageRoutes'
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
