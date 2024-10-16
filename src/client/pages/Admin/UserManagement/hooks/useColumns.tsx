import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { RoleName, User, Users } from 'meta/user'

import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import { Column } from 'client/components/TablePaginated'
import NameField from 'client/pages/Admin/UserManagement/NameField'
import RoleField from 'client/pages/Admin/UserManagement/RoleField'

type Props = {
  path: string
}

type Returned = Array<Column<User>>

export const useColumns = (props: Props): Returned => {
  const { path } = props
  const { t } = useTranslation()

  const selectedRoles = useTablePaginatedFilterValue<Array<string>>(path, 'roles')

  return useMemo<Returned>(() => {
    const roleColumns = Object.values(RoleName).reduce<Returned>((acc, roleName) => {
      if (Objects.isEmpty(selectedRoles) || selectedRoles.includes(roleName)) {
        acc.push({
          component: ({ datum }) => <RoleField roleName={roleName} user={datum} />,
          header: t(Users.getI18nRoleLabelKey(roleName)),
          key: roleName,
        })
      }
      return acc
    }, [])

    return [
      {
        component: ({ datum }) => <NameField user={datum} />,
        header: t('common.name'),
        key: 'name',
        orderByProperty: 'name',
      },
      ...roleColumns,
    ]
  }, [selectedRoles, t])
}
