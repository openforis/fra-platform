import './CustomUsersCount.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { UserManagementActions, useRoleNames, useUsersCount } from 'client/store/ui/userManagement'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { TablePaginatedCounterComponent } from 'client/components/TablePaginated'

const CustomUsersCount: TablePaginatedCounterComponent = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const roleNames = useRoleNames()
  const usersCount = useUsersCount()
  const { assessmentName, cycleName } = useCycleRouteParams()

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsersCount({
        assessmentName,
        cycleName,
        includeRoleTotals: true,
      })
    )
  }, [assessmentName, cycleName, dispatch])

  return (
    <div className="custom-user-counts__container">
      {roleNames.map((roleName) => (
        <div key={roleName} className="custom-user-counts__item">
          {`${t(Users.getI18nRoleLabelKey(roleName))} ${usersCount[roleName] || 0}`}
        </div>
      ))}
      <div className="custom-user-counts__item">{`${t(`common.total`)} ${usersCount.total || 0}`}</div>
    </div>
  )
}
export default CustomUsersCount
