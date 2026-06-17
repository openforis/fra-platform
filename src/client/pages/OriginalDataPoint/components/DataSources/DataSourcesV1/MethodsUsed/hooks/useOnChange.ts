import { useCallback } from 'react'

import { ODPDataSourceMethod, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = { originalDataPoint: OriginalDataPoint }

type OnChange = (values: Array<ODPDataSourceMethod>) => void

// Treat v1 datasources as single data source.
// Mapping: dataSourceMethods -> DataSource.type
export const useOnChange = (props: Props): OnChange => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<OnChange>(
    (values) => {
      const dataSource = originalDataPoint.dataSources?.at(0)
      updateDataSources([{ ...dataSource, type: values as Array<string> }])
    },
    [originalDataPoint, updateDataSources]
  )
}
