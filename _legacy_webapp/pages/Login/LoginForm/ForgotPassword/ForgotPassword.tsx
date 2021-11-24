import React, { MouseEventHandler, useEffect, useRef } from 'react'

import { useI18n } from '../../../../hooks'
import { useAppDispatch } from '../../../../store'
import { LoginActions, useResetPassword } from '../../../../store/login'

import Error from '../../Error'

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

const ForgotPassword: React.FC<Props> = (props) => {
  const { onClose } = props

  const i18n = useI18n()
  const dispatch = useAppDispatch()
  const emailRef = useRef(null)
  const { error, message } = useResetPassword()
  const messages = typeof message === 'string' ? message.split('\n') : []

  useEffect(() => {
    dispatch(LoginActions.updateResetPasswordMessage())
  }, [])

  if (messages.length > 0) {
    return (
      <div>
        {messages.map((item, i) => (
          <span key={String(i)}>
            {item}
            <br />
          </span>
        ))}
      </div>
    )
  }

  return (
    <>
      <Error error={error} />

      <div className="login__form">
        <h3>{i18n.t('login.forgotPasswordTitle')}</h3>

        <input type="text" ref={emailRef} placeholder={i18n.t('login.email')} />

        <div className="login__buttons">
          <button type="button" className="btn" onClick={onClose}>
            {i18n.t('login.cancel')}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              dispatch(LoginActions.resetPassword(emailRef.current.value))
            }}
          >
            {i18n.t('login.submit')}
          </button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
