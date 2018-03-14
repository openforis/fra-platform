import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from './../../reusableUiComponents/icon'

import { getUrlParameter } from '../../utils/urlUtils'
import { findResetPassword } from './../actions'

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

  componentDidMount () {
    const uuid = getUrlParameter('k')
    this.props.findResetPassword(uuid)
  }

  render () {
    console.log(this.props)
    const {resetPassword} = this.props
    return R.propEq('status', 'loaded', this.props) && resetPassword && !R.isNil(R.prop('user', resetPassword))
      ? <div className="login__form">

        <input type="text" name="email" value={resetPassword.user.email} disabled={true}/>
        <input type="password" name="password" ref="password" value="" placeholder="Password"/>
        <input type="password" name="password2" ref="password2" value="" placeholder="Repeat password"/>

        <div className="login__buttons">
          <button className="btn" type="button"
                  onClick={() => {}}>
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
})

export default connect(mapStateToProps, {findResetPassword})(ResetPasswordForm)
