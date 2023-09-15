import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ODPNationalClass, ODPs, OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Sanitizer } from 'client/utils/sanitizer'

export const useUpdateOriginalData = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()

  return useCallback(
    (
      field: keyof ODPNationalClass,
      value: string,
      prevValue: string,
      index: number,
      originalDataPoint: OriginalDataPoint
    ) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointOriginalData({
          originalDataPoint: ODPs.updateNationalClass({
            odp: originalDataPoint,
            index,
            field,
            value: Sanitizer.acceptNextDecimal(value, prevValue),
          }),
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
