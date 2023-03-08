import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'
import { RoleName, User, Users } from '@meta/user'

const UserRolesField: React.FC<{ roleName: RoleName; user: User }> = ({ roleName, user }) => {
  const { t } = useTranslation()

  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">
        {user.roles
          .filter((role) => role.role === roleName)
          .map((role) =>
            role.role === RoleName.ADMINISTRATOR
              ? t(Users.getI18nRoleLabelKey(role.role))
              : t(Areas.getTranslationKey(role.countryIso))
          )
          .join(', ')}
      </div>
    </td>
  )
}

export default UserRolesField
