import './i18n'

import 'client/style/Main.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { Tracking } from 'client/utils/tracking'

import PageRoutes from './pages/PageRoutes'
import store from './store/store'

Tracking.init()

const Main = (): void => {
  const root = createRoot(document.querySelector('#main'))
  root.render(
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  )
}

Main()
