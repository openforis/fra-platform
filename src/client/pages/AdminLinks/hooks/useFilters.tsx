import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LinkValidationStatusCode } from 'meta/cycleData'
import { Links } from 'meta/cycleData/links/links'
import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

export const useFilters = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const statusOptions: Array<{
      label: string
      value: LinkValidationStatusCode
    }> = Object.values(LinkValidationStatusCode).map((status) => ({
      label: t(Links.getI18nValidationStatusLabelKey(status)),
      value: status,
    }))

    return [
      {
        fieldName: 'codes',
        label: t('admin.lastStatus'),
        multiLabelSummaryKey: 'common.status',
        options: statusOptions,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
    ]
  }, [t])
}
