import { useCallback } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { UUIDs } from 'meta/uuid/uuids'

import { useUpdateDataSources } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useUpdateDataSources'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = () => void

export const useOnAdd = (props: Props): Returned => {
  const { originalDataPoint } = props

  const updateDataSources = useUpdateDataSources({ originalDataPoint })

  return useCallback<Returned>(() => {
    const dataSource: DataSource = { comments: '', reference: '', type: [], uuid: UUIDs.getUuid() }
    const dataSourcesUpdate = [...(originalDataPoint.dataSources ?? []), dataSource]
    updateDataSources(dataSourcesUpdate)
  }, [originalDataPoint.dataSources, updateDataSources])
}
