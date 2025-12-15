import './Login.scss'
import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useInjectSlice } from 'client/store/hooks'
import { LoginSlice } from 'client/store/login/slice'
import Partners from 'client/pages/CycleHome/Partners'
import ChangePassword from 'client/pages/LoginDeprecated/ChangePassword'
import Invitation from 'client/pages/LoginDeprecated/Invitation'
import InvitationLocal from 'client/pages/LoginDeprecated/InvitationLocal'
import LoginForm from 'client/pages/LoginDeprecated/LoginForm'
import ResetPassword from 'client/pages/LoginDeprecated/ResetPassword'

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
            <Route path={Routes.LoginResetPassword.path.relative}>
              <Route element={<ResetPassword />} index />
              <Route element={<ChangePassword />} path={Routes.LoginChangePassword.path.relative} />
            </Route>
          </RouterRoutes>
          <img alt="" className="login__tucan" src="/img/tucan.svg" />
        </div>

        <Partners />
      </div>
    </div>
  )
}

export default Login
