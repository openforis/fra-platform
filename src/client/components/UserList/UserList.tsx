import './UserList.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { CountryIso } from '@meta/area'
import { User, Users, UserStatus } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import Icon from '../Icon'
import ButtonUserListExport from './ButtonUserListExport'
import UserInvitationInfo from './UserInvitationInfo'

const UserColumn: React.FC<{ user: User; field: keyof User }> = ({ user, field }) => (
  <td className="user-list__cell">
    <div className="user-list__cell--read-only">{user[field] ? (user[field] as string) : '\xA0'}</div>
  </td>
)

const UserRoleColumn: React.FC<{ user: User; countryIso: CountryIso }> = ({ user, countryIso }) => {
  const { i18n } = useTranslation()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {i18n.t<string>(Users.getI18nRoleLabelKey(Users.getCountryRole(user, countryIso).role))}
      </div>
    </td>
  )
}

const UserRow: React.FC<{ user: User; showEmail: boolean }> = ({ user, showEmail }) => {
  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const currentUser = useUser()

  const { acceptedAt, invitationUuid } = Users.getCountryRole(user, countryIso)

  const removeInvitation = useCallback(() => {
    if (window.confirm(i18n.t('userManagement.confirmDelete', { user: user.name })))
      dispatch(
        UserManagementActions.removeInvitation({
          countryIso,
          invitationUuid,
        })
      ).then(() => {
        toaster.success(i18n.t<string>('userManagement.invitationDeleted'))
      })
  }, [countryIso, dispatch, i18n, invitationUuid, toaster, user.name])

  return (
    <tr
      className={classNames({
        'user-list__invitation-row': invitationUuid && !acceptedAt,
        'user-list__inactive-user': user.status === UserStatus.inactive,
      })}
    >
      <UserColumn user={user} field="name" />
      <UserRoleColumn user={user} countryIso={countryIso} />
      {showEmail && <UserColumn user={user} field="email" />}
      <td className="user-list__cell user-list__edit-column">
        {invitationUuid && !acceptedAt ? (
          <>
            <button
              key={0}
              className="btn-s btn-link"
              onClick={() => setShowInvitationInfo(true)}
              title={i18n.t<string>('userManagement.info')}
              type="button"
            >
              <Icon name="round-e-info" />
            </button>

            <button
              key={1}
              className="btn-s btn-link-destructive"
              disabled={currentUser.id === user.id}
              onClick={removeInvitation}
              title={i18n.t<string>('userManagement.remove')}
              type="button"
            >
              <Icon name="trash-simple" />
            </button>
          </>
        ) : (
          <Link
            to={ClientRoutes.Assessment.User.getLink({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              id: user.id,
            })}
            type="button"
            className="link"
          >
            {i18n.t<string>('userManagement.edit')}
          </Link>
        )}
        {showInvitationInfo ? <UserInvitationInfo user={user} onClose={() => setShowInvitationInfo(false)} /> : null}
      </td>
    </tr>
  )
}

const UsersTableHeadRow: React.FC<{ showEmail: boolean }> = ({ showEmail }) => {
  const { i18n } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{i18n.t<string>('userManagement.name')}</th>
        <th className="user-list__header-cell">{i18n.t<string>('userManagement.role')}</th>
        {showEmail && <th className="user-list__header-cell">{i18n.t<string>('userManagement.email')}</th>}
        <th className="user-list__header-cell user-list__edit-column">
          <ButtonUserListExport />
        </th>
      </tr>
    </thead>
  )
}

const UserList: React.FC<{ users: Array<User>; isAdmin: boolean }> = ({ users, isAdmin }) => {
  const { i18n } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UsersTableHeadRow showEmail={isAdmin} />
      <tbody>
        {users.map((user: User) => (
          <UserRow key={user.id} user={user} showEmail={isAdmin} />
        ))}
      </tbody>
    </table>
  ) : (
    <>{i18n.t('userManagement.noUsers')}</>
  )
}

export default UserList
