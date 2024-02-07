import './InviteUserForm.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Lang, LanguageCodes } from 'meta/lang'
import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useInitialState } from 'client/components/InviteUserForm/hooks/initialState'

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

  return (
    <div className="edit-user__form-container invite-user-container">
      {Object.values(errors).find((value) => !!value) && (
        <div className="invite-user-error-container">{t('userManagement.formErrors')}</div>
      )}

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.name')}*</div>
        <input
          className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
          onFocus={() => setErrors({ ...errors, name: null })}
          name="name"
          value={userToInvite.name}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, name: e.target.value })
          }
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('editUser.surname')}*</div>
        <input
          className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
          onFocus={() => setErrors({ ...errors, surname: null })}
          name="surname"
          value={userToInvite.surname}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, surname: e.target.value })
          }
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.role')}*</div>
        <div className="edit-user__form-field edit-user__form-select-field">
          <select
            className="fra-table__select"
            value={userToInvite.role}
            onChange={(e) => setUserToInvite({ ...userToInvite, role: e.target.value as RoleName })}
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
          className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
          onFocus={() => setErrors({ ...errors, email: null })}
          name="email"
          value={userToInvite.email}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserToInvite({ ...userToInvite, email: e.target.value })
          }
        />
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('common.language')}</div>
        <div className="edit-user__form-field edit-user__form-select-field">
          <select
            className="fra-table__select"
            value={userToInvite.lang}
            onChange={(e) => setUserToInvite({ ...userToInvite, lang: e.target.value as Lang })}
          >
            {LanguageCodes.map((lang) => (
              <option key={lang} value={lang}>
                {t(`language.${lang}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

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
