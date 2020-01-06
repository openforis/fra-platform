import React from 'react'
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
      To reset your password go to the <a href="/login" style={{fontWeight: 'bold', color: 'white'}}>login page</a>
    </div>
  </div>

class ResetPasswordForm extends React.Component {

  constructor () {
    super()
    this.state = {password: '', password2: ''}
  }

  componentDidMount () {
    const uuid = getUrlParameter('k')
    this.props.findResetPassword(uuid)
  }

  render () {

    const {resetPassword = {}, changePasswordResponse = {}, changePassword} = this.props

    return changePasswordResponse.message
      ? <div className="alert-confirmation-message">
        <div>{changePasswordResponse.message}</div>
        <div><a href="/login" style={{fontWeight: 'bold', color: 'white'}}>Click here to access the login page</a></div>
      </div>
      : R.propEq('status', 'loaded', this.props) && !R.isNil(R.prop('user', resetPassword))
        ? <div className="login__form">

          <input type="text" name="email" value={resetPassword.user.email} disabled={true}/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={e => this.setState({password: e.target.value})}/>
          <input type="password"
                 value={this.state.password2}
                 placeholder="Repeat password"
                 onChange={e => this.setState({password2: e.target.value})}
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
                        this.state.password,
                        this.state.password2
                      )
                    }}>
              Change password
            </button>
          </div>
        </div>
        : R.isNil(this.props.status)
          ? null
          : <ResetPasswordNotFound/>
  }
}

const mapStateToProps = state => ({
  status: R.path(['resetPassword', 'status'], state),
  resetPassword: R.path(['resetPassword', 'data'], state),
  changePasswordResponse: R.prop('changePassword', state)
})

export default connect(mapStateToProps, {findResetPassword, changePassword})(ResetPasswordForm)
