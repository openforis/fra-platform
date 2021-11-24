import './login.scss'
import React from 'react'
import { Route } from 'react-router-dom'

import * as BasePaths from '../../main/basePaths'

import Partners from '../../components/Partners'

import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm'

const Login: React.FC = () => (
  <>
    <div className="login">
      <Route exact path={BasePaths.resetPassword}>
        <ResetPasswordForm />
      </Route>

      <Route exact path={BasePaths.login}>
        <LoginForm />
      </Route>

      <img alt="" src="/img/tucan.svg" className="login__tucan" />
    </div>
    <Partners />
  </>
)

export default Login
