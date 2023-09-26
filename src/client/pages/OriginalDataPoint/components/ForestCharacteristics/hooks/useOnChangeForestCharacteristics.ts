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
  { name: 'forestNaturalPercent', type: 'decimal' },
  { name: 'forestPlantationPercent', type: 'decimal' },
  { name: 'otherPlantedForestPercent', type: 'decimal' },
]

type Props = {
  index: number
}

export const useOnChangeForestCharacteristics = (props: Props) => {
  const { index } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const originalDataPoint = useOriginalDataPoint()
  const updateOriginalData = useUpdateOriginalData()

  const onChangeForestNaturalPercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'forestNaturalPercent'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [index, originalDataPoint, updateOriginalData]
  )

  const onChangeForestPlantationPercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'forestPlantationPercent'
      const { value } = event.target
      updateOriginalData({ field, value, index, originalDataPoint })
    },
    [index, originalDataPoint, updateOriginalData]
  )

  const onChangeOtherPlantedForestPercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const field = 'otherPlantedForestPercent'
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

  const onPasteForestNaturalPercent = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 1 })
    },
    [_onPaste]
  )

  const onPasteForestPlantationPercent = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 2 })
    },
    [_onPaste]
  )

  const onPasteOtherPlantedForestPercent = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      _onPaste({ event, colIndex: 3 })
    },
    [_onPaste]
  )

  return {
    onChangeForestNaturalPercent,
    onChangeForestPlantationPercent,
    onChangeOtherPlantedForestPercent,
    onPasteForestNaturalPercent,
    onPasteForestPlantationPercent,
    onPasteOtherPlantedForestPercent,
  }
}
