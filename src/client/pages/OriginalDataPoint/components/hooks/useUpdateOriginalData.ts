import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ODPNationalClass, ODPs, OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Sanitizer } from 'client/utils/sanitizer'

type Props = {
  field: keyof ODPNationalClass
  value: string
  index: number
  originalDataPoint: OriginalDataPoint
}

export const useUpdateOriginalData = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()

  return useCallback(
    (props: Props) => {
      const { field, value, index, originalDataPoint } = props
      const nationalClass = originalDataPoint.nationalClasses[index]
      const prevValue = nationalClass[field] as string

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
