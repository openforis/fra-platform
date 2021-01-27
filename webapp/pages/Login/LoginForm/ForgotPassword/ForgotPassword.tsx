import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import Error from '../../Error'

import { resetPassword, resetPasswordFormReset } from '../../actions'

type Props = {
  onClose: (...args: any[]) => any
}

const ForgotPassword = (props: Props) => {
  const { onClose } = props

  const dispatch = useDispatch()
  const emailRef = useRef(null)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type '{}'.
  const { error, message } = useSelector(R.pathOr({}, ['login', 'localLogin', 'resetPassword']))
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
        <h3>Enter your email and submit the form to receive instructions via email</h3>

        <input type="text" ref={emailRef} placeholder="Email" />

        <div className="login__buttons">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              dispatch(resetPassword(emailRef.current.value))
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
