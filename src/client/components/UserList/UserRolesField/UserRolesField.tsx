import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { TooltipId } from 'meta/tooltip'
import { RoleName, User, Users } from 'meta/user'

const UserRolesField: React.FC<{ roleName: RoleName; user: User }> = ({ roleName, user }) => {
  const { t } = useTranslation()

  const roles = user.roles
    .filter((role) => role.role === roleName)
    .map((role) =>
      role.role === RoleName.ADMINISTRATOR ? t(Users.getI18nRoleLabelKey(role.role)) : t(Areas.getTranslationKey(role.countryIso))
    )

  const firstThreeRoles = roles.length > 3 ? `${roles.slice(0, 3).join(', ')}...` : roles.join(', ')

  const otherRoles = roles.length > 3 ? roles.join(', ') : null

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only" data-tooltip-id={TooltipId.info} data-tooltip-content={otherRoles}>
        {firstThreeRoles}
      </div>
    </td>
  )
}

export default UserRolesField
