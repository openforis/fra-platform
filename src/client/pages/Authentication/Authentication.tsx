import 'client/pages/Authentication/Authentication.scss'
import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router'

import Login from 'client/pages/Authentication/Login'
import Partners from 'client/pages/CycleHome/Partners'

const Authentication: React.FC = () => {
  return (
    <div className="login-view">
      <div className="login">
        <RouterRoutes>
          <Route element={<Login />} index />
        </RouterRoutes>
        <img alt="tucan" className="login__tucan" src="/img/tucan.svg" />
      </div>

      <Partners />
    </div>
  )
}

export default Authentication
