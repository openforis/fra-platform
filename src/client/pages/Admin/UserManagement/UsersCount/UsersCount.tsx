import './UsersCount.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RoleName, Users } from 'meta/user'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import { useRoleNames } from 'client/store/ui/userManagement'
import { TablePaginatedCounterComponent } from 'client/components/TablePaginated'

const UsersCount: TablePaginatedCounterComponent = () => {
  const { t } = useTranslation()

  const roleNames = useRoleNames()
  const usersCount = useTablePaginatedCount(ApiEndPoint.Admin.users()) as Record<RoleName | 'total', number>

  return (
    <div className="user-counts__container">
      {roleNames.map((roleName) => (
        <div key={roleName} className="user-counts__item">
          {`${t(Users.getI18nRoleLabelKey(roleName))} ${usersCount[roleName] || 0}`}
        </div>
      ))}
      <div className="user-counts__item">{`${t(`common.total`)} ${usersCount.total || 0}`}</div>
    </div>
  )
}
export default UsersCount
