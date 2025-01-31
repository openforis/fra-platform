import { CountryIso } from 'meta/area'
import { RecordTableData } from 'meta/data'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useLastApprovedHistoryTableData = (): RecordTableData => {
  const { assessmentName, cycleName, countryIso } = useSectionRouteParams<CountryIso>()

  return useAppSelector((state) =>
    DataSelector.History.getLastApprovedTableData(state, {
      assessmentName,
      cycleName,
      countryIso,
    })
  )
}
