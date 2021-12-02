// import '@client/styles/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
// import PageRoutes from './pages/PageRoutes'
import store from './store/store'
// import './i18n'

const Main = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <h1> PageRoutes </h1>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#main')
  )
}

Main()
