import './Login.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Partners from 'client/pages/CycleHome/Partners'

const Login: React.FC = () => {
  return (
    <>
      <div className="login__container">
        <div className="login">
          <Outlet />
        </div>

        <img alt="" src="/img/tucan.svg" className="login__tucan" />
      </div>

      <Partners />
    </>
  )
}

export default Login
