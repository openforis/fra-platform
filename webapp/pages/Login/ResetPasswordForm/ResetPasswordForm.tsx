import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as BasePaths from '@webapp/main/basePaths'
import { getUrlParameter } from '@webapp/utils/urlUtils'

import useOnUpdate from '@webapp/components/hooks/useOnUpdate'

import { findResetPassword, changePassword } from '../actions'

import Error from '../Error'

const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const { status, resetPassword = {}, changePasswordResponse = {} } = useSelector((state) => ({
    status: R.path(['login', 'resetPassword', 'status'], state),
    resetPassword: R.path(['login', 'resetPassword', 'data'], state),
    changePasswordResponse: R.path(['login', 'changePassword'], state),
  }))

  const loaded = status === 'loaded'
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(changePasswordResponse.error)

  useEffect(() => {
    const uuid = getUrlParameter('k')
    if (uuid) dispatch(findResetPassword(uuid))
  }, [])

  useOnUpdate(() => {
    setError(changePasswordResponse.error)
  }, [changePasswordResponse])

  if (!loaded) {
    return null
  }

  if (changePasswordResponse.message) {
    return (
      <div className="login__form">
        <div>{changePasswordResponse.message}</div>
        <div>
          <Link to={BasePaths.login} className="btn">
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (resetPassword && resetPassword.user !== null) {
    return (
      <>
        <Error error={error} />

        <div className="login__form">
          <input type="text" name="email" value={resetPassword.user.email} disabled />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value)
              setError(null)
            }}
          />

          <input
            type="password"
            value={password2}
            placeholder="Repeat password"
            onChange={(event) => {
              setPassword2(event.target.value)
              setError(null)
            }}
          />

          <div>
            <button
              className="btn"
              type="button"
              onClick={() => dispatch(changePassword(resetPassword.uuid, resetPassword.user.id, password, password2))}
            >
              Change password
            </button>
          </div>
        </div>
      </>
    )
  }

  return <Error error="Ooops. It looks like the link you clicked is expired or not valid" />
}

export default ResetPasswordForm
