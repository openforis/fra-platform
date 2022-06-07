import './InviteUserForm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from '@meta/user'

import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import TextInput from '../TextInput'

const validName = (name: string) => !!name.trim()
const validRole = (role: string) => !!role
const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

interface User {
  id: number
  name: string
  role?: RoleName
  email: string
}

interface UserTextFieldColProps {
  user: User
  field: keyof User
  editing?: boolean
  readOnly?: boolean
  updateUser: React.Dispatch<React.SetStateAction<User>>
  validate: (value: string) => boolean
}

const UserTextFieldCol = ({ user, field, editing, readOnly = false, updateUser, validate }: UserTextFieldColProps) => {
  const { i18n } = useTranslation()

  return (
    <td className={`user-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
      {editing && (
        <TextInput
          placeholder={i18n.t(`userManagement.${field}`)}
          value={user[field]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateUser({ ...user, [field]: e.target.value })}
          disabled={false}
        />
      )}
      {!editing && readOnly && <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>}{' '}
      {!editing && !readOnly && <div className="user-list__cell--editable">{user[field]}</div>}
    </td>
  )
}

UserTextFieldCol.defaultProps = {
  editing: false,
  readOnly: false,
}

interface UserRoleSelectColProps {
  user: User
  editing?: boolean
  readOnly?: boolean
  updateUser: React.Dispatch<React.SetStateAction<User>>
  validate: (value: string) => boolean
  allowedRoles: Array<RoleName>
}

const UserRoleSelectCol = ({
  user,
  editing = false,
  readOnly = false,
  updateUser,
  validate,
  allowedRoles,
}: UserRoleSelectColProps) => {
  const { i18n } = useTranslation()

  return (
    <td className={`user-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
      {editing && (
        <div className="user-list__input-container validation-error-sensitive-field">
          <select
            className="fra-table__select"
            value={user.role}
            onChange={(e) => updateUser({ ...user, role: e.target.value as RoleName })}
          >
            {!user.role ? <option value="">{i18n.t('userManagement.placeholder')}</option> : null}
            {allowedRoles.map((role: RoleName) => (
              <option key={role} value={role}>
                {i18n.t(Users.getRoleNameTranslationKey(role))}
              </option>
            ))}
          </select>
        </div>
      )}
      {!editing && readOnly && (
        <div className="user-list__cell--read-only">{i18n.t(Users.getRoleNameTranslationKey(user.role))}</div>
      )}
      {!editing && !readOnly && (
        <div className="user-list__cell--editable">{i18n.t(Users.getRoleNameTranslationKey(user.role))}</div>
      )}
    </td>
  )
}

UserRoleSelectCol.defaultProps = {
  editing: false,
  readOnly: false,
}

const InviteUserForm: React.FC = () => {
  const [userToInvite, setUserToInvite] = useState<User>({
    id: -1,
    name: '',
    email: '',
  })
  const [invalidForm, setInvalidForm] = useState<boolean>(false)

  const { i18n } = useTranslation()
  const user = useUser()
  const countryIso = useCountryIso()

  return (
    <div className="add-user__container">
      {invalidForm && <div className="add-user__error-container">{i18n.t('userManagement.formErrors')}</div>}

      <table className="add-user__table">
        <thead>
          <tr>
            <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
            <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
            <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <UserTextFieldCol
              user={userToInvite}
              field="name"
              editing
              updateUser={setUserToInvite}
              validate={validName}
            />
            <UserRoleSelectCol
              user={userToInvite}
              editing
              updateUser={setUserToInvite}
              validate={validRole}
              allowedRoles={Users.getRolesAllowedToEdit({ user, countryIso })}
            />
            <UserTextFieldCol
              user={userToInvite}
              field="email"
              editing
              updateUser={setUserToInvite}
              validate={validEmail}
            />
            <td style={{ padding: 0 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setInvalidForm(!(validName(user.name) && validEmail(user.email)))
                  // if (!invalidForm) addNewUser(countryIso)
                }}
                type="submit"
              >
                {i18n.t('userManagement.addUser')}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InviteUserForm
