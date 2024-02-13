import './Login.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Partners from 'client/pages/CycleHome/Partners'

const Login: React.FC = () => {
  return (
    <div className="login-view">
      <div className="app-view__content">
        <div className="login">
          <Outlet />

          <img alt="" src="/img/tucan.svg" className="login__tucan" />
        </div>

        <Partners />
      </div>
    </div>
  )
}

export default Login
