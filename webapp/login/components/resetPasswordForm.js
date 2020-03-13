import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'

import { getUrlParameter } from '@webapp/utils/urlUtils'
import { findResetPassword, changePassword } from './../actions'

const ResetPasswordNotFound = () =>
  <div className="alert-error">
    <div className="alert-icon">
      <Icon name="alert"/>
    </div>
    <div>
      Ooops. It looks like the link you clicked is expired or not valid.<br/>
      To reset your password go to the <a href="/login" style={{ fontWeight: 'bold', color: 'white' }}>login page</a>
    </div>
  </div>

const ResetPasswordForm = props => {
  
  const {
    status = '', resetPassword = {}, changePasswordResponse = {},
    changePassword, findResetPassword
  } = props

  useEffect(() => {
    const uuid = getUrlParameter('k')
    findResetPassword(uuid)
  }, [])

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  return changePasswordResponse.message
    ? (
      <div className="alert-confirmation-message">
        <div>{changePasswordResponse.message}</div>
        <div><a href="/login" style={{ fontWeight: 'bold', color: 'white' }}>Click here to access the login page</a>
        </div>
      </div>
    )
    : R.equals(status, 'loaded') && !R.isNil(R.prop('user', resetPassword))
      ? (
        <div className="login__form">

          <input type="text" name="email" value={resetPassword.user.email} disabled={true}/>
          <input type="password"
                 value={password}
                 placeholder="Password"
                 onChange={e => setPassword(e.target.value)}/>
          <input type="password"
                 value={password2}
                 placeholder="Repeat password"
                 onChange={e => setPassword2(e.target.value)}
          />
          {
            changePasswordResponse.error
              ? <div className="alert-error">
                <div className="alert-icon">
                  <Icon name="alert"/>
                </div>
                <div>
                  {changePasswordResponse.error}
                </div>
              </div>
              : null
          }
          <div className="login__buttons">
            <button className="btn" type="button"
                    onClick={() => {
                      changePassword(
                        resetPassword.uuid,
                        resetPassword.user.id,
                        password,
                        password2
                      )
                    }}>
              Change password
            </button>
          </div>
        </div>
      )
      : R.isNil(status)
        ? null
        : <ResetPasswordNotFound/>

}

const mapStateToProps = state => ({
  status: R.path(['login', 'resetPassword', 'status'], state),
  resetPassword: R.path(['login', 'resetPassword', 'data'], state),
  changePasswordResponse: R.path(['login', 'changePassword'], state)
})

export default connect(mapStateToProps, { findResetPassword, changePassword })(ResetPasswordForm)
