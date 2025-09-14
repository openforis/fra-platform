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
        fieldName: 'countries',
        label: t('common.countries'),
        type: TablePaginatedFilterType.COUNTRY,
      },
      {
        fieldName: 'roles',
        label: t('common.role'),
        multiLabelSummaryKey: 'admin.role',
        options: roleOptions,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
      {
        defaultValue: false,
        fieldName: 'expired',
        label: t('common.expired'),
        type: TablePaginatedFilterType.SWITCH,
      },
      {
        defaultValue: false,
        fieldName: 'accepted',
        label: t('common.accepted'),
        type: TablePaginatedFilterType.SWITCH,
      },
    ]
  }, [t])
}
