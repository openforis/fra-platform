import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import Error from '../../Error'

import { resetPassword, resetPasswordFormReset } from '../../actions'
import { useI18n } from '@webapp/components/hooks'

type Props = {
  onClose: (...args: any[]) => any
}

const ForgotPassword = (props: Props) => {
  const { onClose } = props

  const i18n = useI18n()
  const dispatch = useDispatch()
  const emailRef = useRef(null)
  const { error, message }: any = useSelector(R.pathOr({}, ['login', 'localLogin', 'resetPassword']))
  const messages = typeof message === 'string' ? message.split('\n') : []

  useEffect(() => {
    dispatch(resetPasswordFormReset())
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
              dispatch(resetPassword(emailRef.current.value))
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
