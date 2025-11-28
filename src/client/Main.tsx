import './i18n'

import 'client/style/Main.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import PageRoutes from './pages/PageRoutes'
import store from './store/store'

const Main = (): void => {
  const root = createRoot(document.querySelector('#main'))
  root.render(
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  )
}

Main()
