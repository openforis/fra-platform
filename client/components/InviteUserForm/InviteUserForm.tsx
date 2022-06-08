import './InviteUserForm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { RoleName, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import TextInput from '../TextInput'

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

interface UserTextFieldColProps {
  user: UserToInvite
  field: keyof UserToInvite
  updateUser: React.Dispatch<React.SetStateAction<UserToInvite>>
  isValid: boolean
}

const UserTextFieldCol = ({ user, field, updateUser, isValid }: UserTextFieldColProps) => {
  const { i18n } = useTranslation()

  return (
    <td className={classNames('user-list__cell editing', { error: isValid })}>
      <TextInput
        placeholder={i18n.t(`userManagement.${field}`)}
        value={user[field]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateUser({ ...user, [field]: e.target.value })}
        disabled={false}
      />
    </td>
  )
}

interface UserRoleSelectColProps {
  user: UserToInvite
  updateUser: React.Dispatch<React.SetStateAction<UserToInvite>>
  isValid: boolean
  allowedRoles: Array<RoleName>
}

const UserRoleSelectCol = ({ user, updateUser, isValid, allowedRoles }: UserRoleSelectColProps) => {
  const { i18n } = useTranslation()

  return (
    <td className={classNames('user-list__cell editing error', { error: isValid })}>
      <div className="user-list__input-container validation-error-sensitive-field">
        <select
          className="fra-table__select"
          value={user.role}
          onChange={(e) => updateUser({ ...user, role: e.target.value as RoleName })}
        >
          {!user.role ? <option value="">{i18n.t('userManagement.placeholder')}</option> : null}
          {allowedRoles.map((role: RoleName) => (
            <option key={role} value={role}>
              {i18n.t(Users.getI18nRoleLabelKey(role))}
            </option>
          ))}
        </select>
      </div>
    </td>
  )
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

  return (
    <div className="add-user__container">
      {Object.values(errors).find((value) => !!value) && (
        <div className="add-user__error-container">{i18n.t('userManagement.formErrors')}</div>
      )}

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
            <UserTextFieldCol user={userToInvite} field="name" updateUser={setUserToInvite} isValid={errors.name} />
            <UserRoleSelectCol
              user={userToInvite}
              updateUser={setUserToInvite}
              isValid={errors.role}
              allowedRoles={Users.getRolesAllowedToEdit({ user, countryIso })}
            />
            <UserTextFieldCol user={userToInvite} field="email" updateUser={setUserToInvite} isValid={errors.email} />
            <td style={{ padding: 0 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
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
                      setUserToInvite({ name: '', email: '' })
                      toaster.info(i18n.t('userManagement.userAdded', { email: userToInvite.email }))
                    })
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
