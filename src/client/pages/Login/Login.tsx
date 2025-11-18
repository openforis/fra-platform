import './Login.scss'
import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import { useInjectSlice } from 'client/store/hooks'
import { LoginSlice } from 'client/store/login/slice'
import Partners from 'client/pages/CycleHome/Partners'
import Invitation from 'client/pages/Login/Invitation'
import InvitationLocal from 'client/pages/Login/InvitationLocal'
import LoginForm from 'client/pages/Login/LoginForm'
import ResetPassword from 'client/pages/Login/ResetPassword'

const Login: React.FC = () => {
  useInjectSlice(LoginSlice)

  return (
    <div className="login-view">
      <div className="app-view__content">
        <div className="login">
          <RouterRoutes>
            <Route element={<LoginForm />} index />
            <Route element={<Invitation />} path={Routes.LoginInvitation.path.relative}>
              <Route element={<InvitationLocal />} path={Routes.LoginInvitationLocal.path.relative} />
            </Route>
            <Route element={<ResetPassword />} path={Routes.LoginResetPassword.path.relative} />
          </RouterRoutes>
          <img alt="" className="login__tucan" src="/img/tucan.svg" />
        </div>

        <Partners />
      </div>
    </div>
  )
}

export default Login
