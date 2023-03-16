import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'
import { RoleName, User, Users } from '@meta/user'

import Tooltip from '@client/components/Tooltip'

const UserRolesField: React.FC<{ roleName: RoleName; user: User }> = ({ roleName, user }) => {
  const { t } = useTranslation()

  const roles = user.roles
    .filter((role) => role.role === roleName)
    .map((role) =>
      role.role === RoleName.ADMINISTRATOR
        ? t(Users.getI18nRoleLabelKey(role.role))
        : t(Areas.getTranslationKey(role.countryIso))
    )

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        <Tooltip text={roles.join(', ')}>
          {roles.length > 3 ? `${roles.slice(0, 3).join(', ')}...` : roles.join(', ')}
        </Tooltip>
      </div>
    </td>
  )
}

export default UserRolesField
