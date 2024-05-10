import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { ODPNationalClass, ODPs } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Sanitizer } from 'client/utils/sanitizer'

type Props = {
  field: keyof ODPNationalClass
  index: number
  precision?: number
  value: string
}

export const useUpdateOriginalDataField = (): ((props: Props) => void) => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const originalDataPoint = useOriginalDataPoint()

  return useCallback(
    (props: Props) => {
      const { field, index, precision, value } = props
      const nationalClass = originalDataPoint.nationalClasses[index]
      const prevValue = nationalClass[field] as string

      dispatch(
        OriginalDataPointActions.updateOriginalDataPointOriginalData({
          originalDataPoint: ODPs.updateNationalClass({
            odp: originalDataPoint,
            index,
            field,
            value: Sanitizer.acceptNextDecimal(value, prevValue, precision),
          }),
          assessmentName,
          cycleName,
          countryIso: countryIso as CountryIso,
          sectionName,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, originalDataPoint, sectionName]
  )
}
