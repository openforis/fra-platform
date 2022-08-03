import './Buttons.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User, Users } from '@meta/user'

import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

type Props = {
  onCancel: () => void
  onSave: () => void
  onDeactivate: () => void
  userActive?: boolean
  user: User
}

const Buttons = (props: Props) => {
  const { userActive, onCancel, onSave, onDeactivate, user } = props
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const userInfo = useUser()
  const showDeactivate =
    Users.isAdministrator(userInfo) || (Users.isNationalCorrespondent(userInfo, countryIso) && user.id !== userInfo.id)

  return (
    <>
      {showDeactivate && (
        <div className="edit-user__form-item edit-user__form-item-roles">
          <div className="edit-user__form-label">{i18n.t<string>('editUser.status')}</div>
          <div className={`edit-user__form-field edit-user__form-field-roles${Users.validRole(user) ? '' : ' error'}`}>
            <div
              className="edit-user__form-field-role edit-user__form-field-role-admin edit-user__form-field-role-container validation-error-sensitive-field"
              onClick={onDeactivate}
              aria-hidden="true"
            >
              <div className="role">{i18n.t<string>('editUser.activated')}</div>
              <div className={`fra-checkbox${userActive ? ' checked' : ''}`} />
            </div>
          </div>
        </div>
      )}

      <div className="edit-user__form-item edit-user__form-item-buttons">
        <div className="edit-user__form-label" />
        <div className="edit-user__form-field edit-user__form-field-buttons">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            {i18n.t<string>('editUser.cancel')}
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            {i18n.t<string>('editUser.done')}
          </button>
        </div>
      </div>
    </>
  )
}

Buttons.defaultProps = {
  userActive: true,
}

export default Buttons
