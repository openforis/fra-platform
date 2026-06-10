import React from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import DataSources from 'client/components/DataSources'
import { useOptions } from 'client/pages/OriginalDataPoint/components/DataSources/DataSourcesV1/MethodsUsed/hooks/useOptions'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

type Props = {
  originalDataPoint: OriginalDataPoint
}

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
      sectionName={SectionNames.nationalDataPoint}
    />
  )
}

export default DataSourcesV2
