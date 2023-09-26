import React, { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'

const columns: Columns = [{ name: 'forestNaturalForestOfWhichPrimaryForestPercent', type: 'decimal' }]

type Props = {
  index: number
}

export const useOnChangePrimaryForest = (props: Props) => {
  const { index } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const updateOriginalData = useUpdateOriginalData()

  const onChangePrimaryForest = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'forestNaturalForestOfWhichPrimaryForestPercent'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [index, originalDataPoint, updateOriginalData]
  )

  const callback = useCallback(
    (updatedOdp: OriginalDataPoint) => {
      dispatch(
        OriginalDataPointActions.updateOriginalDataPointOriginalData({
          originalDataPoint: updatedOdp,
          assessmentName,
          cycleName,
          countryIso: countryIso as CountryIso,
          sectionName,
        })
      )
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName]
  )

  const _onPaste = useOnPaste({
    columns,
    index,
    callback,
  })

  const onPrimaryForestPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 0 })
    },
    [_onPaste]
  )

  return {
    onChangePrimaryForest,
    onPrimaryForestPaste,
  }
}
