import { useCallback } from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataSourceOnDelete } from 'client/components/DataSources/types'
import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const useOnDelete = (props: Props): DataSourceOnDelete => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<DataSourceOnDelete>(
    (dataSource) => {
      const { dataSources } = originalDataPoint
      const dataSourcesUpdate = dataSources.filter((d) => d.uuid !== dataSource.uuid)
      updateDataSources(dataSourcesUpdate)
    },
    [originalDataPoint, updateDataSources]
  )
}
