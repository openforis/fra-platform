import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { userType } from '@common/userUtils'

import { initLogin } from '../actions'
import { getUrlParameter } from '@webapp/utils/urlUtils'

import Icon from '@webapp/components/icon'

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

  componentDidMount () {
    this.props.initLogin()
  }

  onlyLoginType (type) {
    const {user} = this.props
    return user.id && user.type === type
  }

  onlyLocalLogin () {
    return this.onlyLoginType(userType.local)

  }

  onlyGoogleLogin () {
    return this.onlyLoginType(userType.google)

  }

  render () {
    const loginFailed = getUrlParameter('loginFailed')

    const {status, invitation, user} = this.props

    return status === 'loaded'
      ? <div>
        {
          loginFailed
            ? <LoginFailed/>
            : null
        }

        <h2>Login to FRA Platform</h2>
        {
          this.state.localLogin || this.onlyLocalLogin()
            ? <LocalLoginForm
              onCancel={() => this.setState({localLogin: false})}
              user={user}
              onlyLocalLogin={this.onlyLocalLogin()}
              invitation={invitation}
            />
            : <div>
              <a className="btn"
                 href={`/auth/google${invitation ? `?i=${invitation.invitationUuid}` : ''}`}>
                Sign in with Google
              </a>
              {
                this.onlyGoogleLogin()
                  ? null
                  : <button className="btn" type="button"
                            onClick={() => this.setState({localLogin: true})}>
                    Sign in with FRA
                  </button>
              }
            </div>
        }
      </div>
      : null
  }
}

const mapStateToProps = state => ({
  status: R.path(['login', 'login', 'status'], state),
  invitation: R.path(['login', 'login', 'invitation'], state),
  user: R.path(['login', 'login', 'user'], state)
})

export default connect(mapStateToProps, {initLogin})(LoginForm)
