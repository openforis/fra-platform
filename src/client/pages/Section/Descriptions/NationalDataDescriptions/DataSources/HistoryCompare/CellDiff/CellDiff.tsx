import './CellDiff.scss'
import React from 'react'

import { Change } from 'diff'

import { DataCell } from 'client/components/DataGrid'
import DiffText from 'client/components/DiffText'

type Props = {
  changes: Array<Change>
  lastCol?: boolean
  lastRow: boolean
}

const CellDiff: React.FC<Props> = (props) => {
  const { changes, lastCol, lastRow } = props

  return (
    <DataCell className="history-compare__cell-diff" lastCol={lastCol} lastRow={lastRow}>
      <DiffText changes={changes} />
    </DataCell>
  )
}

export default CellDiff
