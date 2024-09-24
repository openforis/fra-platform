import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

export const useFilters = (): Array<TablePaginatedFilter> => {
  const { t } = useTranslation()

  return useMemo<Array<TablePaginatedFilter>>(() => {
    return [
      {
        type: TablePaginatedFilterType.TEXT,
        fieldName: 'fullName',
        label: t('common.name'),
      },
    ]
  }, [t])
}
