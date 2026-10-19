import { ChangeEventHandler, useCallback } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Returned = ChangeEventHandler<HTMLTextAreaElement>

type Props = {
  originalDataPoint: OriginalDataPoint
}

// Treat v1 datasources as single data source.
// Mapping: dataSourceAdditionalComments ->DataSource.comments
export const useOnChange = (props: Props): Returned => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret
        element.selectionEnd = caret
      })
      const dataSource = originalDataPoint.dataSources?.at(0)
      updateDataSources([{ ...dataSource, comments: event.target.value }])
    },
    [originalDataPoint, updateDataSources]
  )
}
