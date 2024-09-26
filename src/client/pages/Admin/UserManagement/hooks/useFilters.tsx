import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<
  TablePaginatedFilter<TablePaginatedFilterType.TEXT> | TablePaginatedFilter<TablePaginatedFilterType.SWITCH>
>

export const useFilters = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return [
      {
        fieldName: 'fullName',
        label: t('common.name'),
        type: TablePaginatedFilterType.TEXT,
      },
      {
        defaultValue: true,
        fieldName: 'administrators',
        isHidden: true,
        label: '',
        type: TablePaginatedFilterType.SWITCH,
      },
    ]
  }, [t])
}
