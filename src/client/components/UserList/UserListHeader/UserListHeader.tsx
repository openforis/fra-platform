import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

import { useFilteredRoleNames } from 'client/store/ui/userManagement'

import UserListButtonExport from '../UserListButtonExport'

const UserListHeader: React.FC<{ isAdmin: boolean; readOnly: boolean }> = ({ isAdmin, readOnly }) => {
  const filteredRoleNames = useFilteredRoleNames()

  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('common.name')}</th>
        {!isAdmin && (
          <>
            <th className="user-list__header-cell">{t('common.role')}</th>
            <th className="user-list__header-cell">{t('common.email')}</th>
          </>
        )}
        {isAdmin &&
          filteredRoleNames.map((roleName: RoleName) => (
            <th key={roleName} className="user-list__header-cell">
              {t(Users.getI18nRoleLabelKey(roleName))}
            </th>
          ))}
        {!readOnly && (
          <th className="user-list__header-cell user-list__edit-column">
            <UserListButtonExport isAdmin={isAdmin} />
          </th>
        )}
      </tr>
    </thead>
  )
}

export default UserListHeader
