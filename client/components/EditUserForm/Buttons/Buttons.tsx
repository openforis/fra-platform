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
        <div className="edit-user__form-item-buttons">
          <div className="edit-user__form-label" />
          <div className="edit-user__form-field-buttons">
            <button type="button" className="btn btn-secondary" onClick={onDeactivate}>
              {userActive ? i18n.t<string>('editUser.deactivate') : i18n.t<string>('editUser.activate')}
            </button>
          </div>
        </div>
      )}

      <div className="edit-user__form-item-buttons">
        <div className="edit-user__form-label" />
        <div className="edit-user__form-field-buttons">
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
