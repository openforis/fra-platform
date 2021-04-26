import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { loginUserPropChange, localLoginSubmit, localLoginReset } from '../../actions'

import Error from '../../Error'
import ForgotPassword from '../ForgotPassword'
import { useI18n } from '@webapp/components/hooks'

type Props = {
  invitation?: any
  user: any
  onCancel: (...args: any[]) => any
}

const LocalLogin = (props: Props) => {
  const { invitation, user, onCancel } = props
  const { invitationUuid } = invitation

  const i18n = useI18n()
  const dispatch = useDispatch()
  const message = useSelector(R.path(['login', 'localLogin', 'message']))
  const [forgotPassword, setForgotPassword] = useState(false)

  useEffect(() => {
    dispatch(localLoginReset())
  }, [])

  const updateUserProp = (prop: any, value: any) => {
    dispatch(loginUserPropChange(prop, value))
    dispatch(localLoginReset())
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
          <button type="button" className="btn" onClick={() => dispatch(localLoginSubmit(user, invitationUuid))}>
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
