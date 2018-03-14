import React from 'react'
import { getUrlParameter } from '../../utils/urlUtils'

import Icon from '../../reusableUiComponents/icon'

import LocalLoginForm from './localLoginForm'

const LoginFailed = () =>
  <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <Icon name="alert"/>
      </div>
      <div className="alert-message">User not authorized</div>
    </div>
  </div>

class LoginForm extends React.Component {

  constructor () {
    super()
    this.state = {localLogin: false}
  }

  render () {
    const invitationUUID = getUrlParameter('i')
    const loginFailed = getUrlParameter('loginFailed')

    return <div>
      {
        loginFailed
          ? <LoginFailed/>
          : null
      }

      <h2>Login to FRA Platform</h2>
      {
        this.state.localLogin
          ? <LocalLoginForm onCancel={() => this.setState({localLogin: false})}/>
          : <div>
            <a className="btn"
               href={`/auth/google${invitationUUID ? `?i=${invitationUUID}` : ''}`}>
              Sign in with Google
            </a>
            <button className="btn" type="button"
                    onClick={() => this.setState({localLogin: true})}>
              Sign in with FRA
            </button>
          </div>
      }
    </div>
  }
}

export default LoginForm
