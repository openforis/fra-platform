import { useMemo } from 'react'

import { DataSourcesData } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const useDataSourcesData = (props: Props): DataSourcesData => {
  const { originalDataPoint } = props
  const { dataSources = [] } = originalDataPoint

  return useMemo<DataSourcesData>(() => {
    return { dataSources }
  }, [dataSources])
}
