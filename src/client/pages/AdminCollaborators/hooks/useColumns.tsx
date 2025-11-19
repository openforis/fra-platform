import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { UserCountrySummary } from 'meta/user/countrySummary'
import { RoleName } from 'meta/user/role/name'
import { Users } from 'meta/user/users'

import { Column } from 'client/components/TablePaginated'

import NameField from '../NameField'
import RoleField from '../RoleField'

type Returned = Array<Column<UserCountrySummary>>

const roles = [
  RoleName.ADMINISTRATOR,
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

export const useColumns = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const roleColumns: Returned = roles.map((roleName) => ({
      component: ({ datum }) => <RoleField roleName={roleName} userSummary={datum} />,
      header: t(Users.getI18nRoleLabelKey(roleName)),
      key: roleName,
    }))

    return [
      {
        component: ({ datum }) => <NameField userSummary={datum} />,
        header: t('common.name'),
        key: 'full_name',
        orderByProperty: 'full_name',
      },
      ...roleColumns,
    ]
  }, [t])
}
