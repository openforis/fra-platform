import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { User, Users, UserStatus } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import Icon from '../../Icon'
import UserInvitationInfo from '../UserInvitationInfo'
import UserField from './UserField'
import UserRoleField from './UserRoleField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation()

  const { id, status } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': status === UserStatus.inactive,
      })}
    >
      <UserField user={user} field="name" />
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">TODO</div>
      </td>
      <UserField user={user} field="email" />
      <td className="user-list__cell user-list__edit-column">
        <Link to={ClientRoutes.Admin.User.getLink({ id })} type="button" className="link">
          {t('userManagement.edit')}
        </Link>
      </td>
    </tr>
  )
}

const CollaboratorListElement: React.FC<{ user: User }> = ({ user }) => {
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
      <UserField user={user} field="name" />
      <UserRoleField user={user} countryIso={countryIso} />
      <UserField user={user} field="email" />
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

const UserListElement: React.FC<{ user: User; isAdmin: boolean }> = ({ user, isAdmin }) =>
  isAdmin ? <AdministrationListElement user={user} /> : <CollaboratorListElement user={user} />

export default UserListElement
