import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'
import { Objects } from 'utils/objects'

import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

type Returned = Array<TablePaginatedFilter<TablePaginatedFilterType>>

type Props = {
  countryIso?: CountryIso
}

export const useFilters = (props: Props): Returned => {
  const { countryIso } = props
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
        fieldName: 'countries',
        hidden: !Objects.isEmpty(countryIso),
        label: t('common.countries'),
        type: TablePaginatedFilterType.COUNTRY,
      },
      {
        fieldName: 'codes',
        label: t('admin.lastStatus'),
        multiLabelSummaryKey: 'common.status',
        options: statusOptions,
        type: TablePaginatedFilterType.MULTI_SELECT,
      },
    ]
  }, [countryIso, t])
}
