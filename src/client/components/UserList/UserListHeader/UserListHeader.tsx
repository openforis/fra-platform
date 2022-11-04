import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from '@meta/user'

import UserListButtonExport from '../UserListButtonExport'

type Props = {
  isAdmin: boolean
  roleNames: Array<RoleName>
}

const UserListHeader: React.FC<Props> = ({ isAdmin, roleNames }) => {
  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('userManagement.name')}</th>
        {!isAdmin && <th className="user-list__header-cell">{t('userManagement.role')}</th>}
        {isAdmin &&
          roleNames.map((roleName: RoleName) => (
            <th key={roleName} className="user-list__header-cell">
              {t(Users.getI18nRoleLabelKey(roleName))}
            </th>
          ))}
        <th className="user-list__header-cell">{t('userManagement.email')}</th>
        <th className="user-list__header-cell user-list__edit-column">
          <UserListButtonExport />
        </th>
      </tr>
    </thead>
  )
}

export default UserListHeader
