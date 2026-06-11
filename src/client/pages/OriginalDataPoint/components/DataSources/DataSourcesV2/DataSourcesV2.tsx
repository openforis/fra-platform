import React from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import DataSources from 'client/components/DataSources'
import { useOptionsMethodsUsed } from 'client/pages/OriginalDataPoint/components/DataSources/hooks/useOptionsMethodsUsed'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

import { useDataSourcesData } from './hooks/useDataSourcesData'
import { useOnChange } from './hooks/useOnChange'
import { useOnDelete } from './hooks/useOnDelete'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const DataSourcesV2: React.FC<Props> = (props) => {
  const { originalDataPoint } = props

  const canEdit = useIsEditODPEnabled()
  const dataSourcesData = useDataSourcesData({ originalDataPoint })
  const options = useOptionsMethodsUsed()
  const onChange = useOnChange({ originalDataPoint })
  const onDelete = useOnDelete({ originalDataPoint })

  return (
    <DataSources
      columns={{ type: { isMulti: true, options } }}
      data={dataSourcesData}
      onChange={onChange}
      onDelete={onDelete}
      options={{ canEdit, canReview: canEdit }}
    />
  )
}

export default DataSourcesV2
