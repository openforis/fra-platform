import React from 'react'
import { useI18n, useCountryIso, useUserInfo } from '@webapp/components/hooks'
import { isAdministrator, isNationalCorrespondent } from '@common/countryRole'

type Props = {
  onCancel: () => void
  onSave: () => void
  onDeactivate?: () => void
  userActive?: boolean
  user: any
}

const Buttons = (props: Props) => {
  const { userActive = true, onCancel, onSave, onDeactivate, user } = props
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const showDeactivate =
    isAdministrator(userInfo) || (isNationalCorrespondent(countryIso, userInfo) && user.id !== userInfo.id)

  return (
    <>
      {showDeactivate && (
        <div className="edit-user__form-item-buttons">
          <div className="edit-user__form-label" />
          <div className="edit-user__form-field-buttons">
            <button type="button" className="btn btn-secondary" onClick={onDeactivate}>
              {userActive ? i18n.t('editUser.deactivate') : i18n.t('editUser.activate')}
            </button>
          </div>
        </div>
      )}

      <div className="edit-user__form-item-buttons">
        <div className="edit-user__form-label" />
        <div className="edit-user__form-field-buttons">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            {i18n.t('editUser.cancel')}
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            {i18n.t('editUser.done')}
          </button>
        </div>
      </div>
    </>
  )
}

export default Buttons
