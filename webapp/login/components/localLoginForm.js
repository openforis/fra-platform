import React from 'react'
import * as R from 'ramda'

import { connect } from 'react-redux'

import { loginUserPropChange, localLoginSubmit, localLoginReset } from './../actions'

import ForgotPasswordFormModal from './forgotPasswordFormModal'
import Icon from '../../reusableUiComponents/icon'

class LocalLoginForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {forgotPassword: false}
  }

  componentDidMount () {
    this.props.localLoginReset()
  }

  render () {
    const {
      onCancel,
      onlyLocalLogin,
      user,
      invitation = {},
      localLoginSubmit,
      loginUserPropChange,
      message
    } = this.props

    const {invitationUuid} = invitation

    return <div className="login__form">

      <input value={user.email} disabled={!!invitationUuid || !!user.id} type="text" placeholder="Email"
             onChange={e => loginUserPropChange('email', e.target.value)}/>

      <input value={user.password} type="password" placeholder="Password"
             onChange={e => loginUserPropChange('password', e.target.value)}/>

      {
        invitationUuid && !user.id
          ? <input value={user.password2} type="password" placeholder="Repeat password"
                   onChange={e => loginUserPropChange('password2', e.target.value)}/>
          : null
      }

      {
        message
          ? <div className="alert-error">
            <div className="alert-icon">
              <Icon name="alert"/>
            </div>
            <div className="alert-message">{
              message.split('\n').map((item, i) =>
                <span key={i}>{item}<br/></span>
              )
            }</div>
          </div>
          : null
      }

      <div className="login__buttons">
        {
          onlyLocalLogin
            ? null
            : <button className="btn"
                      type="reset"
                      onClick={onCancel}>
              Cancel
            </button>
        }
        <button className="btn" type="button"
                onClick={e => localLoginSubmit(user, invitationUuid)}>
          Login
        </button>
      </div>

      <a onClick={() => this.setState({forgotPassword: true})}>Forgot your password ?</a>

      {
        this.state.forgotPassword
          ? <ForgotPasswordFormModal email={R.path(['user', 'email'], this.state)}
                                     onClose={() => this.setState({forgotPassword: false})}/>
          : null
      }

    </div>
  }
}

const mapStateToProps = state => ({
  message: R.path(['login', 'localLogin', 'message'], state)
})

export default connect(mapStateToProps, {loginUserPropChange, localLoginSubmit, localLoginReset})(LocalLoginForm)
