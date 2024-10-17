import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TablePaginatedFilterType } from 'meta/tablePaginated'
import { RoleName, Users } from 'meta/user'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

export const useFilters = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const roleOptions: Array<{
      label: string
      value: RoleName
    }> = Object.values(RoleName).map((roleName) => ({
      label: t(Users.getI18nRoleLabelKey(roleName)),
      value: roleName,
    }))

    return [
      {
        fieldName: 'fullName',
        label: t('common.name'),
        type: TablePaginatedFilterType.TEXT,
      },
      {
        defaultValue: true,
        fieldName: 'administrators',
        hidden: true,
        label: '',
        type: TablePaginatedFilterType.SWITCH,
      },
      {
        fieldName: 'roles',
        label: t('common.role'),
        options: roleOptions,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
    ]
  }, [t])
}
