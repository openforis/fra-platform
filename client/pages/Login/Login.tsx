import './login.scss'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { useUser } from '@client/store/user'
import { ClientRoutes } from '@client/clientRoutes'
import Partners from '@client/components/Partners'
import { Urls } from '@client/utils'

import Invitation from './Invitation'
import LoginForm from './LoginForm'
import ResetPassword from './ResetPassword'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const user = useUser()
  const invitationUuid = Urls.getRequestParam('invitationUuid')

  useEffect(() => {
    if (user && !invitationUuid) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <div className="login">
        <Routes>
          <Route path={ClientRoutes.Login.invitation.path} element={<Invitation />} />
          <Route path={ClientRoutes.Login.resetPassword.path} element={<ResetPassword />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>

        <img alt="" src="/img/tucan.svg" className="login__tucan" />
      </div>
      <Partners />
    </>
  )
}

export default Login
