import React from 'react'
import { useTranslation } from 'react-i18next'

import UserListButtonExport from '../UserListButtonExport'

const UserListHeader: React.FC<{ showLoginEmail: boolean; showRole: boolean; showRoles: boolean }> = ({
  showLoginEmail,
  showRole,
  showRoles,
}) => {
  const { t } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{t('userManagement.name')}</th>
        {showRole && <th className="user-list__header-cell">{t('userManagement.role')}</th>}
        {showRoles && <th className="user-list__header-cell">TODO</th>}
        <th className="user-list__header-cell">{t('userManagement.email')}</th>
        {showLoginEmail && <th className="user-list__header-cell">{t('userManagement.loginEmail')}</th>}
        <th className="user-list__header-cell user-list__edit-column">
          <UserListButtonExport />
        </th>
      </tr>
    </thead>
  )
}

export default UserListHeader
