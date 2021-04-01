import './editUserForm.less'
import React from 'react'
import { connect } from 'react-redux'
import FRA from '@common/assessment/fra'
import * as R from 'ramda'
import {
  isAdministrator,
  isNationalCorrespondent,
  administrator,
  reviewer,
  nationalCorrespondent,
  alternateNationalCorrespondent,
  collaborator,
} from '@common/countryRole'
import { i18nUserRole, validate, profilePictureUri } from '@common/userUtils'
import TextInput from '@webapp/components/textInput'
import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'
import { loadUserToEdit, persistUser } from '../actions'
import CountrySelectionModal from '@webapp/components/CountrySelectionModal'

type EditUserFormState = any
type Props = {
  i18n?: any
  userInfo?: any
  countryIso: any
  countries?: any
  persistUser?: any
  onCancel?: any
  userId: any
}

class EditUserForm extends React.Component<Props, EditUserFormState> {
  props: Props
  constructor(props: Props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    ;(this.props as any).loadUserToEdit((this.props as any).userId)
  }

  componentDidUpdate(prevProps: {}, prevState: EditUserFormState) {
    if (
      (this.props as any).userId !== (prevProps as any).userId ||
      (this.props as any).countryIso !== (prevProps as any).countryIso
    ) {
      ;(this.props as any).loadUserToEdit((this.props as any).userId)
    }
    if (R.path(['user', 'id'], this.state) !== R.path(['user', 'id'], this.props)) {
      this.setState({ user: (this.props as any).user })
    }
  }

  render() {
    const defaultOnCancel = () => window.history.back()
    const { i18n, userInfo, countryIso, countries, persistUser, onCancel = defaultOnCancel } = this.props
    const { user, validation } = this.state
    const hasValidProp = (prop: any) => R.pipe(R.path([prop, 'valid']), R.defaultTo(true))(validation)
    const validateUser = (state: any) => R.assoc('validation', validate(R.prop('user', state)), state)
    const toggleCountryRole = (countryIso: any, role: any) => {
      const userRolesPath = ['user', 'roles']
      const userRoles = R.path(userRolesPath, this.state)
      const idx = R.findIndex(
        (userRole: any) => userRole.countryIso === countryIso && userRole.role === role,
        // @ts-ignore
        userRoles
      )
      const newUserRoles =
        idx >= 0
          ? // @ts-ignore
            R.remove(idx, 1, userRoles)
          : // setting role as administrator, removes all other roles
          role === administrator.role
          ? [{ countryIso: null, role }]
          : // @ts-ignore
            R.insert(userRoles.length, { countryIso, role }, userRoles)
      this.setState((prevState: EditUserFormState) => {
        const newUser = {
          ...prevState.user,
          roles: newUserRoles,
        }

        return {
          ...prevState,
          user: newUser,
          validation: validate(newUser),
        }
      })
    }
    // only administrator can change user roles
    const canEditRoles = isAdministrator(userInfo)
    // properties used to render ui form fields
    const roles = [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]
    const textInputFields = [
      { key: 'name', onlyAdmin: true },
      { key: 'email' },
      { key: 'loginEmail', disabled: true, type: 'google' },
      { key: 'institution' },
      { key: 'position' },
    ]

    return user ? (
      <div className="edit-user__form-container">
        <div className={`edit-user__form-item-picture${hasValidProp('profilePicture') ? '' : ' error'}`}>
          <div className="edit-user__form-label" />
          <div className="edit-user__form-field validation-error-sensitive-field">
            <input
              ref="profilePictureFile"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={() => {
                this.setState(
                  R.pipe(
                    R.assocPath(['user', 'profilePicture'], (this.refs.profilePictureFile as any).files[0]),
                    validateUser
                  )(this.state)
                )
                // preview image
                const reader = new FileReader()
                reader.onload = (e) => ((this.refs.profilePicture as any).src = e.target.result)
                reader.readAsDataURL((this.refs.profilePictureFile as any).files[0])
              }}
            />
            <img ref="profilePicture" src={profilePictureUri(user.id)} className="edit-user__picture-img" />
            <button
              className="btn btn-primary btn-xs"
              onClick={() => (this.refs.profilePictureFile as any).dispatchEvent(new MouseEvent('click'))}
            >
              {i18n.t('editUser.chooseProfilePicture')}
            </button>
            {hasValidProp('profilePicture') ? null : (
              <div className="edit-user__picture-img-invalid">{i18n.t('editUser.picture1MbMax')}</div>
            )}
          </div>
        </div>

        {textInputFields.map((inputField) => {
          const disabled = inputField.disabled === true || (inputField.onlyAdmin ? !isAdministrator(userInfo) : false)
          const allowed = !inputField.type || inputField.type === user.type
          return allowed ? (
            <div className="edit-user__form-item" key={inputField.key}>
              <div className="edit-user__form-label">{i18n.t(`editUser.${inputField.key}`)}</div>
              <div
                className={`edit-user__form-field${disabled ? '-disabled' : ''}${
                  hasValidProp(inputField.key) ? '' : ' error'
                }`}
              >
                <TextInput
                  value={R.prop(inputField.key, user)}
                  onChange={(evt: any) => {
                    // this.setState({user: R.assoc(inputField.key, evt.target.value, user)})
                    this.setState(
                      R.pipe(R.assocPath(['user', inputField.key], evt.target.value), validateUser)(this.state)
                    )
                  }}
                  disabled={disabled}
                />
              </div>
            </div>
          ) : null
        })}

        <div className="edit-user__form-item-roles">
          <div className="edit-user__form-label">{i18n.t('editUser.role')}</div>
          <div className={`edit-user__form-field-roles${hasValidProp('role') ? '' : ' error'}`}>
            {canEditRoles ? (
              <div
                className="edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
                onClick={() => toggleCountryRole(null, administrator.role)}
              >
                <div className="role">{i18n.t('user.roles.administrator')}</div>
                <div className={`fra-checkbox${isAdministrator(user) ? ' checked' : ''}`} />
              </div>
            ) : null}

            {roles.map((role) =>
              // role section is available to administrators or if user has at least one role and it's not administrator
              !isAdministrator(user) &&
              (canEditRoles || R.findIndex(R.propEq('role', role), this.state.user.roles) >= 0) ? (
                <div key={role} className="edit-user__form-field-role-container validation-error-sensitive-field">
                  <div className="edit-user__form-field-role">
                    <div className="role">{i18nUserRole(i18n, role)}</div>
                    {canEditRoles ? (
                      <a
                        className="btn-xs btn-primary"
                        onClick={() => this.setState(R.assocPath(['editingRole', role], true, this.state))}
                      >
                        {i18n.t('description.edit')}
                      </a>
                    ) : null}
                  </div>

                  <div className="edit-user__form-field-role-countries">
                    {(user.roles || [])
                      .filter((userRole: any) => userRole.role === role)
                      .map((userRole: any) => (
                        <div key={userRole.countryIso} className="edit-user__form-field-country-box">
                          {i18n.t(`area.${userRole.countryIso}.listName`)}
                        </div>
                      ))}
                  </div>

                  <CountrySelectionModal
                    isOpen={R.path(['editingRole', role], this.state)}
                    countries={countries}
                    headerLabel={i18nUserRole(i18n, role)}
                    onClose={() => {
                      this.setState(R.dissocPath(['editingRole', role], this.state))
                    }}
                    initialSelection={R.pipe(
                      R.filter((userRole: any) => userRole.role === role),
                      R.map(R.prop('countryIso'))
                    )(user.roles)}
                    onChange={(_countryIso) => toggleCountryRole(_countryIso, role)}
                    unselectableCountries={R.pipe(
                      R.filter((userRole: any) => userRole.role !== role),
                      R.map(R.prop('countryIso'))
                    )(user.roles)}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>

        {(canEditRoles || isNationalCorrespondent(countryIso, userInfo)) && user.id !== userInfo.id ? (
          <div className="edit-user__form-item-buttons">
            <div className="edit-user__form-label" />
            <div className="edit-user__form-field-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  this.setState(R.pipe(R.assocPath(['user', 'active'], !user.active), validateUser)(this.state))
                }
              >
                {user.active ? i18n.t('editUser.deactivate') : i18n.t('editUser.activate')}
              </button>
            </div>
          </div>
        ) : null}

        <div className="edit-user__form-item-buttons">
          <div className="edit-user__form-label" />
          <div className="edit-user__form-field-buttons">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              {i18n.t('editUser.cancel')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (!validation || validation.valid) persistUser(countryIso, this.state.user)
              }}
            >
              {i18n.t('editUser.done')}
            </button>
          </div>
        </div>
      </div>
    ) : null
  }
}
const mapStateToProps = (state: any) => ({
  i18n: AppState.getI18n(state),
  countryIso: AppState.getCountryIso(state),
  userInfo: UserState.getUserInfo(state),
  ...state.userManagement.editUser,
  // get countries if is admin.
  countries: isAdministrator(UserState.getUserInfo(state))
    ? R.pipe(UserState.getUserAssesmentRoles(FRA.type), R.prop(administrator.role))(state)
    : null,
})
export default connect(mapStateToProps, { loadUserToEdit, persistUser })(EditUserForm)
