import React from 'react'

import { DataSourceDescription } from 'meta/assessment/description'
import { DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'

import { DataRow } from 'client/components/DataGrid'
import CellDiff from 'client/components/DataSources/HistoryCompare/CellDiff'
import { PropsDataSources } from 'client/components/DataSources/types'

import { useChanges } from './hooks/useChanges'

type Props = {
  columns?: PropsDataSources['columns']
  historyCompare: DataSourceHistoryCompare
  lastRow: boolean
  meta?: DataSourceDescription
  options: PropsDataSources['options']
}

const HistoryCompare: React.FC<Props> = (props) => {
  const { columns, historyCompare, lastRow, meta, options } = props
  const { includeVariables, includeYears } = options

  const changes = useChanges({ columns, historyCompare, meta })

  return (
    <DataRow>
      <CellDiff changes={changes.reference} lastRow={lastRow} />
      <CellDiff changes={changes.type} lastRow={lastRow} />
      {includeVariables && <CellDiff changes={changes.variables} lastRow={lastRow} />}
      {includeYears && <CellDiff changes={changes.year} lastRow={lastRow} />}
      <CellDiff changes={changes.comments} lastCol lastRow={lastRow} />
    </DataRow>
  )
}

export default HistoryCompare
