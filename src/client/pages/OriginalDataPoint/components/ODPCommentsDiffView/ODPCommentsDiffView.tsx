import React from 'react'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import DiffDOM from 'client/components/DiffDOM'
import { ODPCommentField } from 'client/pages/OriginalDataPoint/components/Comments/types'

type Props = {
  field: ODPCommentField
}

const ODPCommentsDiffView: React.FC<Props> = (props) => {
  const { field } = props
  const originalDataPoint = useOriginalDataPoint()
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()

  const current = originalDataPoint?.[field] ?? ''
  const prev = originalDataPointHistory?.[field] ?? ''

  return <DiffDOM current={current} prev={prev} />
}

export default ODPCommentsDiffView
