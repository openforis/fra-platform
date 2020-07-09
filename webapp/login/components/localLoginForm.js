import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'

import { loginUserPropChange, localLoginSubmit, localLoginReset } from '../actions'

import ForgotPasswordFormModal from './forgotPasswordFormModal'

const LocalLoginForm = (props) => {
  const { invitation, user, onCancel } = props
  const { invitationUuid } = invitation

  const dispatch = useDispatch()
  const message = useSelector(R.path(['login', 'localLogin', 'message']))
  const [forgotPassword, setForgotPassword] = useState(false)

  useEffect(() => {
    dispatch(localLoginReset())
  }, [])

  return (
    <>
      {forgotPassword && <ForgotPasswordFormModal onClose={() => setForgotPassword(false)} />}

      {message && (
        <div className="login-form__error">
          <Icon name="alert" />
          <div>
            {message.split('\n').map((item, i) => (
              <span key={String(i)}>
                {item}
                <br />
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="login__form">
        <input
          value={user.email}
          disabled={!!invitationUuid || !!user.id}
          type="text"
          placeholder="Email"
          onChange={(event) => dispatch(loginUserPropChange('email', event.target.value))}
        />

        <input
          value={user.password}
          type="password"
          placeholder="Password"
          onChange={(event) => dispatch(loginUserPropChange('password', event.target.value))}
        />

        {invitationUuid && !user.id && (
          <input
            value={user.password2}
            type="password"
            placeholder="Repeat password"
            onChange={(event) => dispatch(loginUserPropChange('password2', event.target.value))}
          />
        )}

        <div>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn" onClick={() => dispatch(localLoginSubmit(user, invitationUuid))}>
            Login
          </button>
        </div>

        <button type="button" className="btn-forgot-pwd" onClick={() => setForgotPassword(true)}>
          Forgot your password ?
        </button>
      </div>
    </>
  )
}

LocalLoginForm.propTypes = {
  invitation: PropTypes.object,
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
}

LocalLoginForm.defaultProps = {
  invitation: {},
}

export default LocalLoginForm
