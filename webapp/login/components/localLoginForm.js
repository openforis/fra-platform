import React from 'react'

import { connect } from 'react-redux'
import { getUrlParameter } from '../../utils/urlUtils'

import Icon from '../../reusableUiComponents/icon'

class LocalLoginForm extends React.Component {

  constructor () {
    super()
    this.state = {user: {}}
  }

  handleSubmit (e) {
    e.preventDefault()

    console.log('+ user ', this.state.user)
  }

  render () {
    const {onCancel} = this.props

    return <form onSubmit={e => this.handleSubmit(e)}>
      <div className="login__form">
        <input type="hidden" name="invitationUUID" id="invitationUUID"/>
        <input type="text" name="email" id="email" placeholder="Email"/>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <input type="password" name="password2" id="password2" placeholder="Repeat password"/>
      </div>
      <div className="alert-error" id="loginError">
        <div className="alert-icon">
          <Icon name="alert"/>
        </div>
        <div className="alert-message" id="loginErrorMessage"></div>
      </div>
      <div className="login__buttons">
        <button className="btn"
                type="reset"
                onClick={onCancel}>
          Cancel
        </button>
        <button className="btn" type="submit">Login</button>
      </div>
    </form>
  }
}

const mapStateToProps = state => ({
  invitationUUID: getUrlParameter('i')
})

export default connect(mapStateToProps)(LocalLoginForm)
