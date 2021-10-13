import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'
import { getUrlParameter } from '@webapp/utils/urlUtils'

import useOnUpdate from '@webapp/hooks/useOnUpdate'

import { useI18n } from '@webapp/hooks'
import { useAppDispatch } from '@webapp/store'
import { LoginActions, useResetPasswordFormState } from '@webapp/store/login'

import Error from '../Error'

const ResetPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useI18n()
  const {
    status,
    resetPassword = {
      uuid: null,
      user: null,
    },
    changePasswordResponse = { error: '', message: null },
  } = useResetPasswordFormState()

  const loaded = status === 'loaded'
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [error, setError] = useState<string>(changePasswordResponse.error)

  useEffect(() => {
    const uuid = getUrlParameter('k')
    if (uuid) dispatch(LoginActions.findResetPassword(uuid))
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
            {i18n.t('login.login')}
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
            placeholder={i18n.t('login.password')}
            onChange={(event) => {
              setPassword(event.target.value)
              setError(null)
            }}
          />

          <input
            type="password"
            value={password2}
            placeholder={i18n.t('login.repeatPassword')}
            onChange={(event) => {
              setPassword2(event.target.value)
              setError(null)
            }}
          />

          <div>
            <button
              className="btn"
              type="button"
              onClick={() =>
                dispatch(LoginActions.changePassword(resetPassword.uuid, resetPassword.user.id, password, password2))
              }
            >
              {i18n.t('login.changePassword')}
            </button>
          </div>
        </div>
      </>
    )
  }

  return <Error error={i18n.t('login.expired')} />
}

export default ResetPasswordForm
