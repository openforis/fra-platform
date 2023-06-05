import React from 'react'

import classNames from 'classnames'

import { User, Users, UserStatus } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import InvitationColumn from 'client/components/UserList/CollaboratorListElement/InvitationColumn'
import UserEditColumn from 'client/components/UserList/CollaboratorListElement/UserEditColumn'

import UserField from '../UserField'
import UserRoleField from '../UserRoleField'

const CollaboratorListElement: React.FC<{ user: User; readOnly: boolean }> = ({ user, readOnly }) => {
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const userRole = Users.getRole(user, countryIso, cycle)
  const { acceptedAt, invitationUuid } = userRole

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
            <InvitationColumn user={user} userRole={userRole} invitationUuid={invitationUuid} />
          ) : (
            <UserEditColumn user={user} id={user.id} />
          )}
        </td>
      )}
    </tr>
  )
}

export default CollaboratorListElement
