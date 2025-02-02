import React from 'react'

import { OriginalDataPoint } from 'meta/assessment'

import DiffText from 'client/components/DiffText'
import { useFieldChanges } from 'client/pages/OriginalDataPoint/hooks/useFieldChanges'

type Props = {
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

const DiffView: React.FC<Props> = (props) => {
  const { originalDataPoint, path } = props

  const changes = useFieldChanges({ originalDataPoint, path })

  return <DiffText changes={changes} />
}

export default DiffView
