import './UsersCount.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RoleName } from 'meta/user/role/name'
import { Users } from 'meta/user/users'

import { useTablePaginatedCount } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedCounterComponent } from 'client/components/TablePaginated'

const UsersCount: TablePaginatedCounterComponent = () => {
  const { t } = useTranslation()

  const roleNames = [
    RoleName.ADMINISTRATOR,
    RoleName.REGIONAL_FOCAL_POINT,
    RoleName.REVIEWER,
    RoleName.NATIONAL_CORRESPONDENT,
    RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
    RoleName.COLLABORATOR,
    RoleName.VIEWER,
  ]

  const usersCount = useTablePaginatedCount(ApiEndPoint.User.many()) as Record<RoleName | 'total', number>

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
