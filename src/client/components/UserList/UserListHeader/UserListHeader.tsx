import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from '@meta/user'

import { roleNames } from '@client/pages/Admin/UserManagement/utils/roleNames'

import UserListButtonExport from '../UserListButtonExport'

const UserListHeader: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
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
