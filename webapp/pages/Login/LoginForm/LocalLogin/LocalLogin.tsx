import React, { MouseEventHandler, useEffect, useState } from 'react'

import { useI18n } from '@webapp/hooks'
import { LoginActions } from '@webapp/store/login'

import { useAppDispatch, useAppSelector } from '@webapp/store'
import Error from '../../Error'
import ForgotPassword from '../ForgotPassword'

type Props = {
  invitation?: { invitationUuid: string }
  user: { email?: string; password?: string; password2?: string }
  onCancel: MouseEventHandler<HTMLButtonElement>
}

const LocalLogin = (props: Props) => {
  const { invitation, user, onCancel } = props
  const { invitationUuid } = invitation

  const i18n = useI18n()
  const dispatch = useAppDispatch()
  const message = useAppSelector((state) => state.login.localLogin.message)
  const [forgotPassword, setForgotPassword] = useState(false)

  useEffect(() => {
    dispatch(LoginActions.updateLocalLoginMessage())
  }, [])

  const updateUserProp = (field: string, value: string) => {
    dispatch(LoginActions.updateLoginUser({ field, value }))
    dispatch(LoginActions.updateLocalLoginMessage())
  }

  if (forgotPassword) return <ForgotPassword onClose={() => setForgotPassword(false)} />

  return (
    <>
      <Error error={message} />

      <div className="login__form">
        <input
          value={user.email || ''}
          disabled={!!invitationUuid || !!user.id}
          type="text"
          placeholder={i18n.t('login.email')}
          onChange={(event) => updateUserProp('email', event.target.value)}
        />

        <input
          value={user.password || ''}
          type="password"
          placeholder={i18n.t('login.password')}
          onChange={(event) => updateUserProp('password', event.target.value)}
        />

        {invitationUuid && !user.id && (
          <input
            value={user.password2 || ''}
            type="password"
            placeholder={i18n.t('login.repeatPassword')}
            onChange={(event) => updateUserProp('password2', event.target.value)}
          />
        )}

        <div>
          <button type="button" className="btn" onClick={onCancel}>
            {i18n.t('login.cancel')}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() =>
              dispatch(
                LoginActions.localLoginSubmit({
                  user,
                  invitationUuid,
                })
              )
            }
          >
            {i18n.t('login.login')}
          </button>
        </div>

        <button type="button" className="btn-forgot-pwd" onClick={() => setForgotPassword(true)}>
          {i18n.t('login.forgotPassword')}
        </button>
      </div>
    </>
  )
}

LocalLogin.defaultProps = {
  invitation: {},
}

export default LocalLogin
