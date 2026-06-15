import { useCallback } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = { originalDataPoint: OriginalDataPoint }

type OnChange = (value?: string) => void

// Treat v1 datasources as single data source.
// Mapping: reference -> DataSource.reference
export const useOnChange = (props: Props): OnChange => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<OnChange>(
    (value) => {
      const dataSource = originalDataPoint.dataSources?.at(0)
      updateDataSources([{ ...dataSource, reference: value ?? '' }])
    },
    [originalDataPoint, updateDataSources]
  )
}
