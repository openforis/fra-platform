import { ChangeEventHandler, useCallback } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1/hooks/useUpdateDataSources'

type Returned = ChangeEventHandler<HTMLTextAreaElement>

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const useOnChange = (props: Props): Returned => {
  const { originalDataPoint } = props

  const updateOriginalDataPoint = useUpdateDataSources()

  return useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret
        element.selectionEnd = caret
      })
      const originalDataPointUpdate = {
        ...originalDataPoint,
        dataSourceAdditionalComments: event.target.value,
      }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )
}
