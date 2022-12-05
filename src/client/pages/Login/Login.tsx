import './Login.scss'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import Partners from '@client/components/Partners'

import Invitation from './Invitation'
import LoginForm from './LoginForm'
import ResetPassword from './ResetPassword'

const Login: React.FC = () => {
  return (
    <>
      <div className="login">
        <Routes>
          <Route path={ClientRoutes.Login.Invitation.path.relative} element={<Invitation />} />
          <Route path={ClientRoutes.Login.ResetPassword.path.relative} element={<ResetPassword />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>

        <img alt="" src="/img/tucan.svg" className="login__tucan" />
      </div>

      <Partners />
    </>
  )
}

export default Login
