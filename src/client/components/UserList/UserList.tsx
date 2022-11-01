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
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
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
  const { t } = useTranslation()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {t(Users.getI18nRoleLabelKey(Users.getCountryRole(user, countryIso).role))}
      </div>
    </td>
  )
}

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const currentUser = useUser()
  const { t } = useTranslation()

  const { acceptedAt, invitationUuid } = Users.getCountryRole(user, countryIso)

  const removeInvitation = useCallback(() => {
    if (window.confirm(t('userManagement.confirmDelete', { user: user.name })))
      dispatch(
        UserManagementActions.removeInvitation({
          countryIso,
          invitationUuid,
        })
      ).then(() => {
        toaster.success(t('userManagement.invitationDeleted'))
      })
  }, [countryIso, dispatch, t, invitationUuid, toaster, user.name])

  return (
    <tr
      className={classNames({
        'user-list__invitation-row': invitationUuid && !acceptedAt,
        'user-list__inactive-user': user.status === UserStatus.inactive,
      })}
    >
      <UserColumn user={user} field="name" />
      <UserRoleColumn user={user} countryIso={countryIso} />
      <UserColumn user={user} field="email" />
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">TODO</div>
      </td>
      <td className="user-list__cell user-list__edit-column">
        {invitationUuid && !acceptedAt ? (
          <>
            <button
              key={0}
              className="btn-s btn-link"
              onClick={() => setShowInvitationInfo(true)}
              title={t('userManagement.info')}
              type="button"
            >
              <Icon name="round-e-info" />
            </button>

            <button
              key={1}
              className="btn-s btn-link-destructive"
              disabled={currentUser.id === user.id}
              onClick={removeInvitation}
              title={t('userManagement.remove')}
              type="button"
            >
              <Icon name="trash-simple" />
            </button>
          </>
        ) : (
          <Link
            to={ClientRoutes.Assessment.Home.Users.User.getLink({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              id: user.id,
            })}
            type="button"
            className="link"
          >
            {t('userManagement.edit')}
          </Link>
        )}
        {showInvitationInfo ? <UserInvitationInfo user={user} onClose={() => setShowInvitationInfo(false)} /> : null}
      </td>
    </tr>
  )
}

const AdminTableUserRow: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation()

  const { id, status } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': status === UserStatus.inactive,
      })}
    >
      <UserColumn user={user} field="name" />
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">TODO</div>
      </td>
      <UserColumn user={user} field="email" />
      <td className="user-list__cell user-list__edit-column">
        <Link to={ClientRoutes.Admin.User.getLink({ id })} type="button" className="link">
          {t('userManagement.edit')}
        </Link>
      </td>
    </tr>
  )
}

const UsersTableHeadRow: React.FC<{ showLoginEmail: boolean; showRole: boolean; showRoles: boolean }> = ({
  showLoginEmail,
  showRole,
  showRoles,
}) => {
  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('userManagement.name')}</th>
        {showRole && <th className="user-list__header-cell">{t('userManagement.role')}</th>}
        {showRoles && <th className="user-list__header-cell">TODO</th>}
        <th className="user-list__header-cell">{t('userManagement.email')}</th>
        {showLoginEmail && <th className="user-list__header-cell">{t('userManagement.loginEmail')}</th>}
        <th className="user-list__header-cell user-list__edit-column">
          <ButtonUserListExport />
        </th>
      </tr>
    </thead>
  )
}

const UserList: React.FC<{ users: Array<User>; isAdmin: boolean }> = ({ users, isAdmin }) => {
  const { t } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UsersTableHeadRow showLoginEmail={!isAdmin} showRole={!isAdmin} showRoles={isAdmin} />
      <tbody>
        {users.map((user: User) =>
          isAdmin ? <AdminTableUserRow key={user.id} user={user} /> : <UserRow key={user.id} user={user} />
        )}
      </tbody>
    </table>
  ) : (
    <>{t('userManagement.noUsers')}</>
  )
}

export default UserList
