import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

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
  const { status, invitation, user } = useSelector(R.pathOr({}, ['login', 'login']))

  const dispatch = useDispatch()
  const [loginLocal, setLoginLocal] = useState(false)
  const loginFailed = getUrlParameter('loginFailed')

  useEffect(() => {
    dispatch(initLogin())
  }, [])

  if (status !== 'loaded') return null

  return (
    <div>
      {loginFailed && <LoginFailed />}

      {loginLocal ? (
        <LocalLoginForm onCancel={() => setLoginLocal(false)} user={user} invitation={invitation} />
      ) : (
        <div>
          <a className="btn" href={`/auth/google${invitation ? `?i=${invitation.invitationUuid}` : ''}`}>
            Sign in with Google
          </a>

          <button className="btn" type="button" onClick={() => setLoginLocal(true)}>
            Sign in with FRA
          </button>
        </div>
      )}
    </div>
  )
}

export default LoginForm
