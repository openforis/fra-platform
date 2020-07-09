import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { userType } from '@common/userUtils'
import { getUrlParameter } from '@webapp/utils/urlUtils'

import Icon from '@webapp/components/icon'

import { initLogin } from '../actions'

import LocalLoginForm from './localLoginForm'

const LoginFailed = () => (
  <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <Icon name="alert" />
      </div>
      <div className="alert-message">User not authorized</div>
    </div>
  </div>
)

const LoginForm = () => {
  const { status, invitation, user } = useSelector(R.path(['login', 'login']))
  const onlyLoginGoogle = user.id && user.type === userType.google
  const onlyLoginLocal = user.id && user.type === userType.local

  const dispatch = useDispatch()
  const [loginLocal, setLoginLocal] = useState(false)
  const loginFailed = getUrlParameter('loginFailed')

  useEffect(() => {
    dispatch(initLogin())
  })

  if (status !== 'loaded') return null

  return (
    <div>
      {loginFailed && <LoginFailed />}

      {loginLocal || onlyLoginLocal ? (
        <LocalLoginForm
          onCancel={() => setLoginLocal(false)}
          user={user}
          onlyLocalLogin={onlyLoginLocal}
          invitation={invitation}
        />
      ) : (
        <div>
          <a className="btn" href={`/auth/google${invitation ? `?i=${invitation.invitationUuid}` : ''}`}>
            Sign in with Google
          </a>
          {!onlyLoginGoogle && (
            <button className="btn" type="button" onClick={() => setLoginLocal(true)}>
              Sign in with FRA
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default LoginForm
