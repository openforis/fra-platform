import './login.scss'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Partners from '@client/components/Partners'

import { BasePaths } from '@client/basePaths'
import { useUser } from '@client/store/user'
import { Urls } from '@client/utils'

import Invitation from './Invitation'
import LoginForm from './LoginForm'
import ResetPassword from './ResetPassword'

const Login: React.FC = () => {
  const history = useHistory()
  const user = useUser()
  const invitationUuid = Urls.getRequestParam('invitationUuid')

  useEffect(() => {
    if (user && !invitationUuid) {
      history.push(BasePaths.Root())
    }
  }, [user])

  return (
    <>
      <div className="login">
        <Route exact path={BasePaths.Login.invitation()}>
          <Invitation />
        </Route>

        <Route exact path={BasePaths.Login.root()}>
          <LoginForm />
        </Route>

        <Route exact path={BasePaths.Login.resetPassword()}>
          <ResetPassword />
        </Route>

        <img alt="" src="/img/tucan.svg" className="login__tucan" />
      </div>
      <Partners />
    </>
  )
}

export default Login
