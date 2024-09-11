import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { TooltipId } from 'meta/tooltip'
import { RoleName, User, Users } from 'meta/user'

type Props = {
  roleName: RoleName
  user: User
}

const RoleField: React.FC<Props> = (props: Props) => {
  const { roleName, user } = props
  const { t } = useTranslation()

  const roles = user.roles
    .filter((role) => role.role === roleName)
    .map((role) =>
      role.role === RoleName.ADMINISTRATOR
        ? t(Users.getI18nRoleLabelKey(role.role))
        : t(Areas.getTranslationKey(role.countryIso))
    )

  const firstThreeRoles = roles.length > 3 ? `${roles.slice(0, 3).join(', ')}...` : roles.join(', ')

  const otherRoles = roles.length > 3 ? roles.join(', ') : null

  return (
    <div className="admin-user-management-cell" data-tooltip-content={otherRoles} data-tooltip-id={TooltipId.info}>
      {firstThreeRoles}
    </div>
  )
}

export default RoleField
