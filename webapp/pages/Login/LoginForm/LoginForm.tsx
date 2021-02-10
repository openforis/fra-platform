import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { getUrlParameter } from '@webapp/utils/urlUtils'

import { initLogin } from '../actions'

import Error from '../Error'
import LocalLogin from './LocalLogin'

const LoginForm = () => {
  const { status, invitation, user }: any = useSelector(R.pathOr({}, ['login', 'login']))

  const dispatch = useDispatch()
  const [loginLocal, setLoginLocal] = useState(false)
  const loginFailed = getUrlParameter('loginFailed')

  useEffect(() => {
    dispatch(initLogin())
  }, [])

  if (status !== 'loaded') return null

  return (
    <div>
      <Error error={loginFailed ? 'User not authorized' : null} />

      {loginLocal ? (
        <LocalLogin onCancel={() => setLoginLocal(false)} user={user} invitation={invitation} />
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
