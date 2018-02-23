import './editUserForm.less'

import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { loadUserToEdit } from '../actions'

import TextInput from '../../reusableUiComponents/textInput'

class EditUserForm extends React.Component {

  constructor (props) {
    super(props)

    this.state = {user: null}
  }

  loadUser (countryIso, userId) {
    this.props.loadUserToEdit(countryIso, userId)
  }

  componentWillMount () {
    this.loadUser(this.props.countryIso, this.props.userId)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.userId !== nextProps.userId ||
      this.props.countryIso !== nextProps.countryIso
    ) {
      this.loadUser(nextProps.countryIso, nextProps.userId)
    }

    if (R.path(['user', 'id'], this.state) !== R.path(['user', 'id'], nextProps)) {
      this.setState({user: nextProps.user})
    }
  }

  render () {
    const {i18n} = this.props
    const {user} = this.state
    console.log(user)

    const textInputFields = [
      {key: 'name'},
      {key: 'email'},
      {key: 'loginEmail', disabled: true},
      {key: 'institution'},
      {key: 'position'},
    ]

    return user
      ? <div className="edit-user__form-container">

        <div className="edit-user__form-item-picture">
          <div className="edit-user__form-label"></div>
          <div className="edit-user__form-field">
            <img src={'/img/avatar.png'} className="edit-user__picture-img"/>
            <button className="btn btn-primary btn-xs">
              {i18n.t('editUser.chooseProfilePicture')}
            </button>
          </div>
        </div>

        {
          textInputFields.map(inputField =>
            <div className="edit-user__form-item" key={inputField.key}>
              <div className="edit-user__form-label">
                {i18n.t(`editUser.${inputField.key}`)}
              </div>
              <div className={`edit-user__form-field${inputField.disabled === true ? '-disabled' : ''}`}>
                <TextInput
                  value={R.prop(inputField.key, user)}
                  onChange={evt => this.setState({user: R.assoc(inputField.key, evt.target.value, user)})}
                  disabled={inputField.disabled === true}
                />
              </div>
            </div>
          )
        }

        <div className="edit-user__form-item">
          <div className="edit-user__form-label">
            {i18n.t('editUser.role')}
          </div>
          <div className="edit-user__form-field-roles">
          </div>
        </div>

      </div>
      : null

  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  ...state.user.editUser
})

export default connect(mapStateToProps, {loadUserToEdit})(EditUserForm)
