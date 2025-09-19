import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryStatus } from 'meta/area'
import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

export const useFilters = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const countryStatusOptions = Object.values(CountryStatus).map((status) => ({
      label: t(`assessment.status.${status}.label`),
      value: status,
    }))

    return [
      {
        fieldName: 'countries',
        label: t('common.countries'),
        type: TablePaginatedFilterType.COUNTRY,
      },
      {
        fieldName: 'statuses',
        label: t('common.status'),
        multiLabelSummaryKey: 'common.status',
        options: countryStatusOptions,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
    ]
  }, [t])
}
