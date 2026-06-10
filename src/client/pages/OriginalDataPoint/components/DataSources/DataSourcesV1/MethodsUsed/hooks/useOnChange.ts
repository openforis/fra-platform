import { useCallback } from 'react'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1/hooks/useUpdateDataSources'

type Props = { originalDataPoint: OriginalDataPoint }

type OnChange = (values: Array<ODPDataSourceMethod>) => void

export const useOnChange = (props: Props): OnChange => {
  const { originalDataPoint } = props

  const updateOriginalDataPoint = useUpdateDataSources()

  return useCallback<OnChange>(
    (values) => {
      const originalDataPointUpdate = { ...originalDataPoint, dataSourceMethods: values }
      updateOriginalDataPoint(originalDataPointUpdate)
    },
    [originalDataPoint, updateOriginalDataPoint]
  )
}
