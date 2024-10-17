import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, Users } from 'meta/user'

import { Column } from 'client/components/TablePaginated'
import NameField from 'client/pages/Admin/UserManagement/NameField'
import RoleField from 'client/pages/Admin/UserManagement/RoleField'

type Returned = Array<Column<User>>

export const useColumns = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const roleColumns: Returned = Object.values(RoleName).map((roleName) => ({
      component: ({ datum }) => <RoleField roleName={roleName} user={datum} />,
      header: t(Users.getI18nRoleLabelKey(roleName)),
      key: roleName,
    }))

    return [
      {
        component: ({ datum }) => <NameField user={datum} />,
        header: t('common.name'),
        key: 'name',
        orderByProperty: 'name',
      },
      ...roleColumns,
    ]
  }, [t])
}
