import './editUserForm.less'

import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'

import {
  isAdministrator,
  administrator,
  reviewer,
  nationalCorrespondent,
  collaborator
} from '../../../common/countryRole'
import {i18nUserRole} from '../../../common/userUtils'

import {loadUserToEdit} from '../actions'
import {getCountryName} from "../../country/actions";

import TextInput from '../../reusableUiComponents/textInput'
import CountrySelectionModal from "./countrySelectionModal";

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
    const {i18n, userInfo, countries, getCountryName} = this.props
    const {user} = this.state

    //only administrator can change user roles
    const canEditRoles = isAdministrator(userInfo)

    const roles = [reviewer.role, nationalCorrespondent.role, collaborator.role]

    const toggleCountryRole = (countryIso, role) => {
      const userRolesPath = ['user', 'roles']
      const userRoles = R.path(userRolesPath, this.state)
      const idx = R.findIndex(userRole => userRole.countryIso === countryIso && userRole.role === role, userRoles)
      const newUserRoles = idx >= 0
        ? R.remove(idx, 1, userRoles)
        : R.insert(userRoles.length, {countryIso, role}, userRoles)
      this.setState(R.assocPath(userRolesPath, newUserRoles, this.state))
    }

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

            {
              canEditRoles
                ? <div className="edit-user__form-field-role edit-user__form-field-country-selector"
                       onClick={() => toggleCountryRole(null, administrator.role)}>
                  <div className="role">{i18n.t('user.roles.administrator')}</div>
                  <div className={`fra-checkbox${isAdministrator(user) ? ' checked' : ''}`}></div>
                </div>
                : null
            }

            {roles.map(role =>
              canEditRoles
                ? <div key={role}>
                  <div className="edit-user__form-field-role">
                    <div className="role">{i18nUserRole(i18n, role)}</div>
                    {
                      canEditRoles
                        ? <a className="btn-xs btn-primary"
                             onClick={() => this.setState(R.assocPath(['editingRole', role], true, this.state))}>
                          {i18n.t('description.edit')}
                        </a>
                        : null
                    }
                  </div>

                  <div className="edit-user__form-field-role-countries">
                    {
                      R.filter(userRole => userRole.role === role, user.roles)
                        .map(userRole =>
                          <div key={userRole.countryIso} className="edit-user__form-field-country-box">
                            {getCountryName(userRole.countryIso, userInfo.lang)}
                          </div>
                        )
                    }
                  </div>

                  {
                    R.path(['editingRole', role], this.state)
                      ? <CountrySelectionModal
                        i18n={i18n}
                        countries={countries}
                        userInfo={userInfo}
                        user={user}
                        role={role}
                        getCountryName={getCountryName}
                        onClose={() => this.setState(R.dissocPath(['editingRole', role], this.state))}
                        onChange={R.partialRight(toggleCountryRole, [role])}
                      />
                      : null
                  }
                </div>
                : null
            )
            }


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

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  ...state.user.editUser,
  //get countries if is admin.
  countries: isAdministrator(state.user.userInfo)
    ? R.path(['country', 'countries', administrator.role], state)
    : null
})

export default connect(mapStateToProps, {loadUserToEdit, getCountryName})(EditUserForm)
