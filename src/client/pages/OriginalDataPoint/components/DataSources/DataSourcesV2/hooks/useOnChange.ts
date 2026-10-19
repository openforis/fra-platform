import { useCallback } from 'react'

import { DataSources } from 'meta/assessment/descriptionValue/dataSources'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataSourceOnChange } from 'client/components/DataSources/types'
import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const useOnChange = (props: Props): DataSourceOnChange => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<DataSourceOnChange>(
    (dataSource, fieldName, fieldValue) => {
      const { dataSources } = originalDataPoint
      const dataSourcesUpdate = DataSources.updateFieldValue({ dataSources, dataSource, fieldName, fieldValue })
      updateDataSources(dataSourcesUpdate)
    },
    [originalDataPoint, updateDataSources]
  )
}
