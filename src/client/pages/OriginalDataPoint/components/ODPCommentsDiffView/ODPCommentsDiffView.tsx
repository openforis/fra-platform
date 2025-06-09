import React from 'react'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import DiffDOM from 'client/components/DiffDOM'

const ODPCommentsDiffView: React.FC = () => {
  const originalDataPoint = useOriginalDataPoint()
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()

  const current = originalDataPoint?.description ?? ''
  const prev = originalDataPointHistory?.description ?? ''

  return <DiffDOM current={current} prev={prev} />
}

export default ODPCommentsDiffView
