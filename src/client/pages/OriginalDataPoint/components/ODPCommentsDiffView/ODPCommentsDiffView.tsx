import React, { useMemo } from 'react'

import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import DiffDOM from 'client/components/DiffDOM'

type Props = {
  field: OriginalDataPointCommentKey
}

const ODPCommentsDiffView: React.FC<Props> = (props) => {
  const { field } = props
  const originalDataPoint = useOriginalDataPoint()
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()

  const current = useMemo<string>(() => originalDataPoint.comments?.[field] ?? '', [field, originalDataPoint.comments])
  const prev = useMemo<string>(
    () => originalDataPointHistory?.comments?.[field] ?? '',
    [field, originalDataPointHistory?.comments]
  )

  return <DiffDOM current={current} prev={prev} />
}

export default ODPCommentsDiffView
