import './Login.scss'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { loginReducer } from 'client/store/login'
import { injectReducer, removeReducer } from 'client/store/store'
import Partners from 'client/pages/CycleHome/Partners'

const Login: React.FC = () => {
  useEffect(() => {
    injectReducer('login', loginReducer)
    return () => {
      removeReducer('login')
    }
  }, [])

  return (
    <div className="login-view">
      <div className="app-view__content">
        <div className="login">
          <Outlet />

          <img alt="" className="login__tucan" src="/img/tucan.svg" />
        </div>

        <Partners />
      </div>
    </div>
  )
}

export default Login
