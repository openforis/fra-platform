import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'
import { RoleName, Users } from 'meta/user'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

export const useFilters = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const roleOptions = Object.values(RoleName).reduce<
      Array<{
        label: string
        value: RoleName
      }>
    >((acc, roleName) => {
      if (roleName === RoleName.ADMINISTRATOR) return acc
      acc.push({
        label: t(Users.getI18nRoleLabelKey(roleName)),
        value: roleName,
      })
      return acc
    }, [])

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
