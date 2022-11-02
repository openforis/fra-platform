import React from 'react'
import { useTranslation } from 'react-i18next'

import UserListButtonExport from '../UserListButtonExport'

const UserListHeader: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('userManagement.name')}</th>
        {!isAdmin && <th className="user-list__header-cell">{t('userManagement.role')}</th>}
        {isAdmin && <th className="user-list__header-cell">TODO</th>}
        <th className="user-list__header-cell">{t('userManagement.email')}</th>
        <th className="user-list__header-cell user-list__edit-column">
          <UserListButtonExport />
        </th>
      </tr>
    </thead>
  )
}

export default UserListHeader
