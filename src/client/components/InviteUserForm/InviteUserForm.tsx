import './InviteUserForm.scss'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Lang, LanguageCodes } from 'meta/lang'
import { RoleName, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'

const validateName = (name: string) => !!name.trim()
const validateRole = (role: string) => !!role
const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

interface UserToInvite {
  name: string
  role?: RoleName | ''
  email: string
  lang: Lang
}

const InviteUserForm: React.FC = () => {
  const [userToInvite, setUserToInvite] = useState<UserToInvite>({
    name: '',
    email: '',
    lang: Lang.en,
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const { t } = useTranslation()
  const { toaster } = useToaster()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

  const langs = useMemo(() => {
    // default to English as first option
    return LanguageCodes.sort((a, b) => {
      if (a === Lang.en) return -1
      if (b === Lang.en) return 1
      return 0
    })
  }, [])

  const onUserInvite = () => {
    const fieldErrors = {
      name: !validateName(userToInvite.name),
      role: !validateRole(userToInvite.role),
      email: !validateEmail(userToInvite.email),
    }
    setErrors(fieldErrors)

    if (!Object.values(fieldErrors).find((value) => !!value))
      dispatch(
        UserManagementActions.inviteUser({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          name: userToInvite.name,
          role: userToInvite.role as RoleName,
          email: userToInvite.email,
          lang: userToInvite.lang,
        })
      )
        .unwrap()
        .then(() => {
          setUserToInvite({ name: '', email: '', role: '', lang: Lang.en })
          toaster.info(t('userManagement.userAdded', { email: userToInvite.email }))
        })
        .catch(() => {
          // Error handled by server
        })
  }

  return (
    <div className="invite-user-container">
      {Object.values(errors).find((value) => !!value) && (
        <div className="invite-user-error-container">{t('userManagement.formErrors')}</div>
      )}
      <div className="invite-user-form">
        <div>
          <div className="label">{t('common.name')}</div>
          <input
            onFocus={() => setErrors({ ...errors, name: null })}
            name="name"
            value={userToInvite.name}
            type="text"
            placeholder={t('common.name')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserToInvite({ ...userToInvite, name: e.target.value })
            }
          />
        </div>
        <div>
          <div className="label">{t('common.role')}</div>
          <select
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
        <div>
          <div className="label">{t('common.email')}</div>
          <input
            onFocus={() => setErrors({ ...errors, email: null })}
            name="email"
            value={userToInvite.email}
            type="text"
            placeholder={t('common.email')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserToInvite({ ...userToInvite, email: e.target.value })
            }
          />
        </div>
        <div>
          <div className="label">{t('common.language')}</div>
          <select
            value={userToInvite.lang}
            onChange={(e) => setUserToInvite({ ...userToInvite, lang: e.target.value as Lang })}
          >
            {langs.map((lang) => (
              <option key={lang} value={lang}>
                {t(`language.${lang}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="btn btn-primary" onClick={onUserInvite} type="submit">
            {t('userManagement.addUser')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InviteUserForm
