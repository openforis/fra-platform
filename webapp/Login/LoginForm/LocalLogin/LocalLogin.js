import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { loginUserPropChange, localLoginSubmit, localLoginReset } from '../../actions'

import Error from '../Error'
import ForgotPassword from '../ForgotPassword'

const LocalLogin = (props) => {
  const { invitation, user, onCancel } = props
  const { invitationUuid } = invitation

  const dispatch = useDispatch()
  const message = useSelector(R.path(['login', 'localLogin', 'message']))
  const [forgotPassword, setForgotPassword] = useState(false)

  useEffect(() => {
    dispatch(localLoginReset())
  }, [])

  const updateUserProp = (prop, value) => {
    dispatch(loginUserPropChange(prop, value))
    dispatch(localLoginReset())
  }

  if (forgotPassword) return <ForgotPassword onClose={() => setForgotPassword(false)} />

  return (
    <>
      <Error error={message} />

      <div className="login__form">
        <input
          value={user.email}
          disabled={!!invitationUuid || !!user.id}
          type="text"
          placeholder="Email"
          onChange={(event) => updateUserProp('email', event.target.value)}
        />

        <input
          value={user.password}
          type="password"
          placeholder="Password"
          onChange={(event) => updateUserProp('password', event.target.value)}
        />

        {invitationUuid && !user.id && (
          <input
            value={user.password2}
            type="password"
            placeholder="Repeat password"
            onChange={(event) => updateUserProp('password2', event.target.value)}
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

LocalLogin.propTypes = {
  invitation: PropTypes.object,
  user: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
}

LocalLogin.defaultProps = {
  invitation: {},
}

export default LocalLogin
