import { OriginalDataPoint } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useLastApprovedOriginalDataPoint = (): OriginalDataPoint => {
  const { assessmentName, countryIso, cycleName, year } = useOriginalDataPointRouteParams()

  return useAppSelector((state) =>
    DataSelector.History.getLastApprovedOriginalDataPoint(state, {
      assessmentName,
      countryIso,
      cycleName,
      year,
    })
  )
}
