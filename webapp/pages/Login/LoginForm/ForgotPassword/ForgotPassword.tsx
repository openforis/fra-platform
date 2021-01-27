import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import Error from '../../Error'

import { resetPassword, resetPasswordFormReset } from '../../actions'

const ForgotPassword = (props) => {
  const { onClose } = props

  const dispatch = useDispatch()
  const emailRef = useRef(null)
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

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ForgotPassword
