import { CountryIso } from 'meta/area'

import { TableDataStatusSelector } from 'client/store/data/tableData/status/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { TableDataStatus } from '../state'

export const useIsSomeTableDataFetching = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const tableStatuses = useAppSelector((state) =>
    Object.values(TableDataStatusSelector.getTableDataStatus(state, assessmentName, cycleName, countryIso))
  )

  return tableStatuses.some((status) => status === TableDataStatus.fetching)
}
