import React, { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateOriginalData } from 'client/pages/OriginalDataPoint/components/hooks/useUpdateOriginalData'

const columns: Columns = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' },
]

type Props = {
  index: number
}

export const useOnChangeExtentOfForest = (props: Props) => {
  const { index } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const updateOriginalData = useUpdateOriginalData()

  const onChangeArea = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'area'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [updateOriginalData, index, originalDataPoint]
  )

  const onChangeForestPercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'forestPercent'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [updateOriginalData, index, originalDataPoint]
  )

  const onChangeOtherWoodedLandPercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'otherWoodedLandPercent'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [updateOriginalData, index, originalDataPoint]
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
    allowGrow: true,
    callback,
  })

  const onPasteArea = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 0 })
    },
    [_onPaste]
  )

  const onPasteForestPercent = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 1 })
    },
    [_onPaste]
  )

  const onPasteOtherWoodedLandPercent = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 2 })
    },
    [_onPaste]
  )

  return {
    onChangeArea,
    onPasteArea,
    onChangeForestPercent,
    onPasteForestPercent,
    onChangeOtherWoodedLandPercent,
    onPasteOtherWoodedLandPercent,
  }
}
