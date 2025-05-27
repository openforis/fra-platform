import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useAppDispatch } from 'client/store/hooks'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useUpdateOriginalData = (): ((originalDataPoint: OriginalDataPoint) => void) => {
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()

  return useCallback(
    (originalDataPoint: OriginalDataPoint) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointOriginalData({
          originalDataPoint: ODPs.calculateValues(originalDataPoint),
          assessmentName,
          cycleName,
          countryIso: countryIso as CountryIso,
          sectionName,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName]
  )
}
