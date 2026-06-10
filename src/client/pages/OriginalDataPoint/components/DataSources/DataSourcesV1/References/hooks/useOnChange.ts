import { useCallback } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Objects } from 'utils/objects'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1/hooks/useUpdateDataSources'

type Props = { originalDataPoint: OriginalDataPoint }

type OnChange = (value?: string) => void

export const useOnChange = (props: Props): OnChange => {
  const { originalDataPoint } = props

  const updateOriginalDataPoint = useUpdateDataSources()

  return useCallback<OnChange>(
    (value) => {
      const dataSourceReferences = Objects.isEmpty(value) ? null : value
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )
}
