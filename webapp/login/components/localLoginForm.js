import React from 'react'
import * as R from 'ramda'

import { connect } from 'react-redux'
import { getUrlParameter } from '../../utils/urlUtils'

import { localLoginSubmit, localLoginReset } from './../actions'

import ForgotPasswordFormModal from './forgotPasswordFormModal'
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

  constructor (props) {
    super(props)
    this.state = {user: {}, forgotPassword: false}
  }

  componentDidMount () {
    this.props.localLoginReset()
  }

  render () {
    const {onCancel, localLoginSubmit, message} = this.props

    const invitationUUID = getUrlParameter('i')

    const formFields = invitationUUID
      ? invitationFields
      : loginFields

    return <div className="login__form">

      {
        formFields.map(f =>
          <input key={f.name} type={f.type} name={f.name} placeholder={f.placeholder}
                 onChange={e => this.setState({user: R.assoc(f.name, e.target.value, this.state.user)})}/>
        )
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
        <button className="btn"
                type="reset"
                onClick={onCancel}>
          Cancel
        </button>
        <button className="btn" type="button"
                onClick={e => localLoginSubmit(this.state.user, invitationUUID)}>
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
  message: R.path(['localLogin', 'message'], state)
})

export default connect(mapStateToProps, {localLoginSubmit, localLoginReset})(LocalLoginForm)
