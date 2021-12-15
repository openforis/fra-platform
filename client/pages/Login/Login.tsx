import './login.scss'
import React from 'react'
import { Route } from 'react-router-dom'

import Partners from '@client/components/Partners'

import { BasePaths } from '@client/basePaths'
// import Local from './Local'
// import ResetPassword from './ResetPassword'

const Login: React.FC = () => (
  <>
    <div className="login">
      <Route exact path={BasePaths.Login.resetPassword()}>
        <div>ResetPassword</div>
      </Route>

      <Route exact path={BasePaths.Login.root()}>
        <div>LoginForm</div>
      </Route>

      <img alt="" src="/img/tucan.svg" className="login__tucan" />
    </div>
    <Partners />
  </>
)

export default Login
