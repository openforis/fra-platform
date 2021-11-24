import React, { useState } from 'react'
import * as R from 'ramda'

import { getRoleLabelKey, roles2 } from '@common/countryRole'

import TextInput from '../../../../components/textInput'
import { validField } from '../userManagement'

const UserTextFieldCol = ({
  countryIso,
  i18n,
  user,
  field,
  editing = false,
  readOnly = false,
  updateUser,
  validate,
}: any) => (
  <td className={`user-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
    {editing ? (
      <TextInput
        placeholder={i18n.t(`userManagement.${field}`)}
        value={user[field]}
        onChange={(e: any) => updateUser(countryIso, user.id, field, e.target.value)}
        disabled={user.saving}
      />
    ) : readOnly ? (
      <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
    ) : (
      <div className="user-list__cell--editable">{user[field]}</div>
    )}
  </td>
)

const roleOptions = (allowedRoles: any, i18n: any) =>
  R.pipe(
    // @ts-ignore
    R.filter((role: any) => R.contains(role.role, allowedRoles)),
    R.map((role: any) => (
      <option key={role.role} value={role.role}>
        {i18n.t(role.labelKey)}
      </option>
    ))
  )(roles2)

const UserRoleSelectCol = ({
  countryIso,
  i18n,
  user,
  editing = false,
  readOnly = false,
  updateUser,
  validate,
  allowedRoles,
}: any) => (
  <td className={`user-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
    {editing ? (
      <div className="user-list__input-container validation-error-sensitive-field">
        <select
          className="fra-table__select"
          value={user.role}
          onChange={(e) => updateUser(countryIso, user.id, 'role', e.target.value)}
          disabled={user.saving}
        >
          {user.role === '' ? <option value="">{i18n.t('userManagement.placeholder')}</option> : null}
          {roleOptions(allowedRoles, i18n)}
        </select>
      </div>
    ) : readOnly ? (
      <div className="user-list__cell--read-only">{i18n.t(getRoleLabelKey(user.role))}</div>
    ) : (
      <div className="user-list__cell--editable">{i18n.t(getRoleLabelKey(user.role))}</div>
    )}
  </td>
)

const AddUserForm = (props: any) => {
  const { countryIso, i18n, user, updateNewUser, addNewUser } = props
  const [adding, setAdding] = useState(false)
  const invalidForm = adding && !(validField(user, 'name') && validField(user, 'role') && validField(user, 'email'))

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
              countryIso={countryIso}
              i18n={i18n}
              user={user}
              field="name"
              editing
              updateUser={updateNewUser}
              validate={adding ? validField(user, 'name') : true}
            />
            <UserRoleSelectCol
              {...props}
              field="role"
              editing
              updateUser={updateNewUser}
              validate={adding ? validField(user, 'role') : true}
            />
            <UserTextFieldCol
              countryIso={countryIso}
              i18n={i18n}
              user={user}
              field="email"
              editing
              updateUser={updateNewUser}
              validate={adding ? validField(user, 'email') : true}
            />
            <td style={{ padding: 0 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAdding(true)
                  addNewUser(countryIso)
                  setAdding(false)
                }}
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

export default AddUserForm
