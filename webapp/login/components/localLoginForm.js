import React from 'react'
import * as R from 'ramda'

import { connect } from 'react-redux'
import { getUrlParameter } from '../../utils/urlUtils'

import Icon from '../../reusableUiComponents/icon'

const loginFields = [
  {type: 'text', name: 'email', placeholder: 'Email'},
  {type: 'password', name: 'password', placeholder: 'Password'}
]

const invitationFields = [
  {type: 'password', name: 'password', placeholder: 'Password'},
  {type: 'password', name: 'password2', placeholder: 'Repeat password'}
]

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

    const invitationUUID = getUrlParameter('i')

    const formFields = invitationUUID
      ? invitationFields
      : loginFields

    return <div className="login__form">
      <div>
        {
          formFields.map(f =>
            <input key={f.name} type={f.type} name={f.name} placeholder={f.placeholder}
                   onChange={e => this.setState({user: R.assoc(f.name, e.target.value, this.state.user)})}/>
          )
        }
      </div>

      {
        false
          ? <div className="alert-error" id="loginError">
            <div className="alert-icon">
              <Icon name="alert"/>
            </div>
            <div className="alert-message" id="loginErrorMessage"></div>
          </div>
          : null
      }

      <div className="login__buttons">
        <button className="btn"
                type="reset"
                onClick={onCancel}>
          Cancel
        </button>
        <button className="btn" type="button"
                onSubmit={e => this.handleSubmit(e)}>
          Login
        </button>
      </div>
      <a onClick={() => ({})}>Forgot your password ?</a>
    </div>
  }
}

const mapStateToProps = state => console.log(state) || ({})

export default connect(mapStateToProps)(LocalLoginForm)
