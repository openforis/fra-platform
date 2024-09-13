import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, Users } from 'meta/user'

import { Column } from 'client/components/TablePaginated'
import NameField from 'client/pages/Admin/UserManagement/NameField'
import RoleField from 'client/pages/Admin/UserManagement/RoleField'

export const useColumns = (): Array<Column<User>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<User>>>(() => {
    const roleColumns: Array<Column<User>> = Object.values(RoleName).map((roleName) => ({
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
