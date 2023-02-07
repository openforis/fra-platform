import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { User, Users, UserStatus } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import Icon from '../../Icon'
import UserField from '../UserField'
import UserInvitationInfo from '../UserInvitationInfo'
import UserRoleField from '../UserRoleField'

const CollaboratorListElement: React.FC<{ user: User; readOnly: boolean }> = ({ user, readOnly }) => {
  const [showInvitationInfo, setShowInvitationInfo] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const currentUser = useUser()
  const { t } = useTranslation()

  const userRole = Users.getRole(user, countryIso, cycle)

  const { acceptedAt, invitationUuid } = userRole

  const removeInvitation = useCallback(() => {
    if (window.confirm(t('userManagement.confirmDelete', { user: Users.getFullName(user) })))
      dispatch(
        UserManagementActions.removeInvitation({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          countryIso,
          invitationUuid,
        })
      ).then(() => {
        toaster.success(t('userManagement.invitationDeleted'))
      })
  }, [t, user, dispatch, assessment.props.name, cycle.name, countryIso, invitationUuid, toaster])

  return (
    <tr
      className={classNames({
        'user-list__invitation-row': invitationUuid && !acceptedAt,
        'user-list__inactive-user': user.status === UserStatus.inactive,
      })}
    >
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">{Users.getFullName(user)}</div>
      </td>
      <UserRoleField user={user} countryIso={countryIso} />
      <UserField user={user} field="email" />
      {!readOnly && (
        <td className="user-list__cell user-list__edit-column">
          {invitationUuid && !acceptedAt ? (
            <>
              <button
                key={0}
                className={classNames('btn-s btn-link', {
                  'btn-link-destructive': UserRoles.isInvitationExpired(userRole),
                })}
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
              to={ClientRoutes.Assessment.Cycle.Country.Users.User.getLink({
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
      )}
    </tr>
  )
}

export default CollaboratorListElement
