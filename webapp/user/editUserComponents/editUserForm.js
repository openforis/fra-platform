import './editUserForm.less'

import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'

import {isAdministrator, administrator} from '../../../common/countryRole'

import {loadUserToEdit} from '../actions'

import TextInput from '../../reusableUiComponents/textInput'

class EditUserForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {user: null}
  }

  loadUser(countryIso, userId) {
    this.props.loadUserToEdit(countryIso, userId)
  }

  componentWillMount() {
    this.loadUser(this.props.countryIso, this.props.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId ||
      this.props.countryIso !== nextProps.countryIso
    ) {
      this.loadUser(nextProps.countryIso, nextProps.userId)
    }

    if (R.path(['user', 'id'], this.state) !== R.path(['user', 'id'], nextProps)) {
      this.setState({user: nextProps.user})
    }
  }

  render() {
    const {i18n, userInfo, countries} = this.props
    const {user} = this.state
    console.log(user)
    console.log(countries)

    const isAdmin = isAdministrator(userInfo)

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
            <input
              ref="profilePictureFile"
              type="file"
              accept="image/*"
              style={{display: 'none'}}
              onChange={() => {
                console.log(this.refs.profilePictureFile.files[0].size)
                //preview image
                const reader = new FileReader()
                reader.onload = e => this.refs.profilePicture.src = e.target.result
                reader.readAsDataURL(this.refs.profilePictureFile.files[0])
              }}
            />
            <img ref="profilePicture" src={'/img/avatar.png'} className="edit-user__picture-img"/>
            <button className="btn btn-primary btn-xs"
                    onClick={() => this.refs.profilePictureFile.dispatchEvent(new MouseEvent('click'))}>
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

        <div className="edit-user__form-item-roles">
          <div className="edit-user__form-label">
            {i18n.t('editUser.role')}
          </div>
          <div className="edit-user__form-field-roles">

            <div className="edit-user__form-field-role edit-user__form-field-country-selector"
                 onClick={() => {
                 }}>
              <div className="role">{i18n.t('user.roles.administrator')}</div>
              <div className={`fra-checkbox${isAdmin ? ' checked' : ''}`}></div>
            </div>

            <div className="edit-user__form-field-role">
              <div className="role">{i18n.t('user.roles.reviewer')}</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              <div className="edit-user__form-field-country-box">Italy</div>
              {isAdmin ? <a className="edit-user__edit-country-link">{i18n.t('description.edit')}</a> : null}
            </div>

            <div className="edit-user__form-field-role">{i18n.t('user.roles.nationalCorrespondent')}</div>
            <div className="edit-user__form-field-role">{i18n.t('user.roles.collaborator')}</div>
          </div>
        </div>

        <div className="edit-user__form-item-buttons">
          <div className="edit-user__form-label"></div>
          <div className="edit-user__form-field-buttons">
            <button className="btn btn-secondary"
                    onClick={() => {
                      this.setState({user: this.props.user})
                      window.history.back()
                    }}>
              {i18n.t('editUser.cancel')}
            </button>
            <button className="btn btn-primary">
              {i18n.t('editUser.done')}
            </button>
          </div>
        </div>

      </div>
      : null

  }
}

const mapStateToProps = (state, props) => console.log(state) || ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  ...state.user.editUser,
  //get countries if is admin.
  countries: isAdministrator(state.user.userInfo)
    ? R.path(['country', 'countries', administrator.role], state)
    : null
})

export default connect(mapStateToProps, {loadUserToEdit})(EditUserForm)
