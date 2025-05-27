import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/hooks'
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

export const useHistoryLastApprovedODPFetched = (): boolean => {
  const data = useLastApprovedOriginalDataPoint()

  return useMemo<boolean>(() => {
    return !Objects.isNil(data)
  }, [data])
}
