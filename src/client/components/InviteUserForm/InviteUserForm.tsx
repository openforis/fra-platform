import './InviteUserForm.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Lang, LanguageCodes } from 'meta/lang'
import { CollaboratorPermissions, RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useInitialState } from 'client/components/InviteUserForm/hooks/initialState'
import InviteCollaboratorPermissions from 'client/components/InviteUserForm/InviteCollaboratorPermissions'

import { useOnUserInvite } from './hooks/useOnUserInvite'
import { UserToInvite } from './userToInvite'

const InviteUserForm: React.FC = () => {
  const initialState = useInitialState()
  const [userToInvite, setUserToInvite] = useState<UserToInvite>(initialState)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const navigate = useNavigate()
  const { t } = useTranslation()

  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()

  const onUserInvite = useOnUserInvite({ userToInvite, setUserToInvite, countryIso, cycle, user, setErrors })

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handlePermissionsChange = (permissions: CollaboratorPermissions) => {
    setUserToInvite({ ...userToInvite, permissions })
  }

  return (
    <div className="edit-user__form-container invite-user-container">
      {Object.values(errors).find((value) => !!value) && (
        <div className="invite-user-error-container">{t('userManagement.formErrors')}</div>
      )}

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.name')}*</div>
        <input
          className="edit-user__form-field edit-user__form-input-text-field input-text"
          name="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, name: e.target.value })
          }
          onFocus={() => setErrors({ ...errors, name: null })}
          type="text"
          value={userToInvite.name}
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('editUser.surname')}*</div>
        <input
          className="edit-user__form-field edit-user__form-input-text-field input-text"
          name="surname"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, surname: e.target.value })
          }
          onFocus={() => setErrors({ ...errors, surname: null })}
          type="text"
          value={userToInvite.surname}
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.role')}*</div>
        <div className="edit-user__form-field edit-user__form-select-field">
          <select
            className="fra-table__select"
            onChange={(e) => {
              const role = e.target.value as RoleName
              if (role !== RoleName.COLLABORATOR) {
                setUserToInvite({ ...userToInvite, role, permissions: undefined })
              } else {
                setUserToInvite({ ...userToInvite, role })
              }
            }}
            value={userToInvite.role}
          >
            <option value="">{t('userManagement.placeholder')}</option>
            {Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => (
              <option key={role} value={role}>
                {t(Users.getI18nRoleLabelKey(role))}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.email')}*</div>

        <input
          className="edit-user__form-field edit-user__form-input-text-field input-text"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, email: e.target.value })
          }
          onFocus={() => setErrors({ ...errors, email: null })}
          type="text"
          value={userToInvite.email}
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.language')}</div>
        <div className="edit-user__form-field edit-user__form-select-field">
          <select
            className="fra-table__select"
            onChange={(e) => setUserToInvite({ ...userToInvite, lang: e.target.value as Lang })}
            value={userToInvite.lang}
          >
            {LanguageCodes.map((lang) => (
              <option key={lang} value={lang}>
                {t(`language.${lang}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {userToInvite.role === RoleName.COLLABORATOR && (
        <InviteCollaboratorPermissions
          onPermissionsChange={handlePermissionsChange}
          permissions={userToInvite.permissions}
        />
      )}

      <div className="edit-user__form-item button-container">
        <button className="btn btn-secondary" onClick={goBack} type="submit">
          {t('common.cancel')}
        </button>

        <button className="btn btn-primary" onClick={onUserInvite} type="submit">
          {t('common.submit')}
        </button>
      </div>
    </div>
  )
}

export default InviteUserForm
