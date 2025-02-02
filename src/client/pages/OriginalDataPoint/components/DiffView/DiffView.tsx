import React from 'react'

import { OriginalDataPoint } from 'meta/assessment'

import { useFieldChanges } from 'client/pages/OriginalDataPoint/hooks/useFieldChanges'
import CellDiff from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/HistoryCompare/CellDiff'

type Props = {
  lastCol?: boolean
  lastRow?: boolean
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

const DiffView: React.FC<Props> = (props) => {
  const { lastCol, lastRow, originalDataPoint, path } = props

  const changes = useFieldChanges({ originalDataPoint, path })

  return <CellDiff changes={changes} lastCol={lastCol} lastRow={lastRow} />
}

export default DiffView
