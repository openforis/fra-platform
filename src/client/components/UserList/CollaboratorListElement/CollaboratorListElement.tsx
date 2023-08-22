import React from 'react'

import classNames from 'classnames'

import { RoleName, User, Users, UserStatus } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import InvitationColumn from 'client/components/UserList/CollaboratorListElement/InvitationColumn'
import UserEditColumn from 'client/components/UserList/CollaboratorListElement/UserEditColumn'

import UserField from '../UserField'
import UserRoleField from '../UserRoleField'

const CollaboratorListElement: React.FC<{ user: User; readOnly: boolean }> = ({ user, readOnly }) => {
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const currentUser = useUser()
  const isReviewer = Users.isReviewer(currentUser, countryIso, cycle)

  const userRole = Users.getRole(user, countryIso, cycle)
  const { acceptedAt, invitationUuid } = userRole

  const showLink = !readOnly

  // Show placeholder if user is a reviewer and the role is reviewer or
  // if the current user is a reviewer and the user has not accepted the invitation
  const showPlaceholder = (isReviewer && userRole.role === RoleName.REVIEWER) || (isReviewer && !acceptedAt)
  const showInvitationColumn = invitationUuid && !acceptedAt && !isReviewer
  const showEditColumn = !showPlaceholder && !showInvitationColumn

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
      {showLink && (
        <td className="user-list__cell user-list__edit-column">
          {showPlaceholder && <div />}
          {showEditColumn && <UserEditColumn user={user} />}
          {showInvitationColumn && <InvitationColumn user={user} userRole={userRole} invitationUuid={invitationUuid} />}
        </td>
      )}
    </tr>
  )
}

export default CollaboratorListElement
