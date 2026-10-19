import React from 'react'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { DataGrid } from 'client/components/DataGrid'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'
import { useShowReviewIndicator } from 'client/pages/OriginalDataPoint/hooks/useShowReviewIndicator'

import AdditionalComments from './AdditionalComments'
import MethodsUsed from './MethodsUsed'
import References from './References'

type Props = {
  originalDataPoint: OriginalDataPoint
}

const DataSourcesV1: React.FC<Props> = (props) => {
  const { originalDataPoint } = props

  const canEdit = useIsEditODPEnabled()
  const showReviewIndicator = useShowReviewIndicator()

  return (
    <DataGrid gridTemplateColumns="180px 1fr" withActions={canEdit || showReviewIndicator}>
      <References originalDataPoint={originalDataPoint} />
      <MethodsUsed originalDataPoint={originalDataPoint} />
      <AdditionalComments originalDataPoint={originalDataPoint} />
    </DataGrid>
  )
}

export default DataSourcesV1
