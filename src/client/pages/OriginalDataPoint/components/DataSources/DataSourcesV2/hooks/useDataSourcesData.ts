import { useMemo } from 'react'

import { DataSource, DataSourcesData } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { UUIDs } from 'meta/uuid/uuids'

type Props = {
  originalDataPoint: OriginalDataPoint
}

export const useDataSourcesData = (props: Props): DataSourcesData => {
  const { originalDataPoint } = props
  const { dataSources = [] } = originalDataPoint

  return useMemo<DataSourcesData>(() => {
    const placeholder: DataSource = { comments: '', placeholder: true, reference: '', type: [], uuid: UUIDs.getUuid() }

    return { dataSources: [...dataSources, placeholder] }
  }, [dataSources])
}
