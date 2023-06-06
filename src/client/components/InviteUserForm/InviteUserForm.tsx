import './InviteUserForm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  role?: RoleName
  email: string
}

const InviteUserForm: React.FC = () => {
  const [userToInvite, setUserToInvite] = useState<UserToInvite>({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const { i18n } = useTranslation()
  const { toaster } = useToaster()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

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
          role: userToInvite.role,
          email: userToInvite.email,
        })
      ).then(() => {
        setUserToInvite({ name: '', email: '', role: '' })
        toaster.info(i18n.t('userManagement.userAdded', { email: userToInvite.email }))
      })
  }

  return (
    <div className="invite-user-container">
      {Object.values(errors).find((value) => !!value) && (
        <div className="invite-user-error-container">{i18n.t<string>('userManagement.formErrors')}</div>
      )}
      <div className="invite-user-form">
        <div>
          <div className="label">{i18n.t<string>('userManagement.name')}</div>
          <input
            onFocus={() => setErrors({ ...errors, name: null })}
            name="name"
            value={userToInvite.name}
            type="text"
            placeholder={i18n.t('userManagement.name')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserToInvite({ ...userToInvite, name: e.target.value })
            }
          />
        </div>
        <div>
          <div className="label">{i18n.t<string>('userManagement.role')}</div>
          <select
            value={userToInvite.role}
            onChange={(e) => setUserToInvite({ ...userToInvite, role: e.target.value as RoleName })}
          >
            <option value="">{i18n.t<string>('userManagement.placeholder')}</option>
            {Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => (
              <option key={role} value={role}>
                {i18n.t<string>(Users.getI18nRoleLabelKey(role))}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="label">{i18n.t<string>('userManagement.email')}</div>
          <input
            onFocus={() => setErrors({ ...errors, email: null })}
            name="email"
            value={userToInvite.email}
            type="text"
            placeholder={i18n.t('userManagement.email')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserToInvite({ ...userToInvite, email: e.target.value })
            }
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={onUserInvite} type="submit">
            {i18n.t<string>('userManagement.addUser')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InviteUserForm
