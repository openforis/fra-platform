import React from 'react'

import { DataSourceDescription } from 'meta/assessment'

import { DataRow } from 'client/components/DataGrid'
import CellDiff from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/HistoryCompare/CellDiff'

import { DataSourceHistoryCompare } from '../hooks/useDataSourcesHistory'
import { useChanges } from './hooks/useChanges'

type Props = {
  historyCompare: DataSourceHistoryCompare
  lastRow: boolean
  meta: DataSourceDescription
}

const HistoryCompare: React.FC<Props> = (props) => {
  const { historyCompare, lastRow, meta } = props

  const changes = useChanges({ historyCompare, meta })

  return (
    <DataRow>
      <CellDiff changes={changes.reference} lastRow={lastRow} />
      <CellDiff changes={changes.type} lastRow={lastRow} />
      <CellDiff changes={changes.variables} lastRow={lastRow} />
      <CellDiff changes={changes.year} lastRow={lastRow} />
      <CellDiff changes={changes.comments} lastCol lastRow={lastRow} />
    </DataRow>
  )
}

export default HistoryCompare
