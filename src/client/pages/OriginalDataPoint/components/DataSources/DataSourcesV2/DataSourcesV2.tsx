import React from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import DataSources from 'client/components/DataSources'
import { useOptions } from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1/MethodsUsed/hooks/useOptions'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const sectionName = 'nationalDataPoint'

const DataSourcesV2: React.FC<Props> = (props) => {
  const { originalDataPoint } = props
  const { dataSources } = originalDataPoint

  const canEdit = useIsEditODPEnabled()
  const options = useOptions()

  return (
    <DataSources
      columns={{ type: { isMulti: true, options } }}
      data={{ dataSources }}
      options={{ canEdit, canReview: canEdit }}
      sectionName={sectionName}
    />
  )
}

export default DataSourcesV2
