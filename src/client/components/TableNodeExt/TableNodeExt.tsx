import './TableNodeExt.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { NodeExt } from 'meta/nodeExt'

import DataGrid from 'client/components/DataGrid'
import DataColumn from 'client/components/DataGrid/DataColumn'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'

import { ColumnNodeExt } from './types'

type Props = {
  columns: Array<ColumnNodeExt>
  data: Array<NodeExt>
  disabled: boolean
  onChange: (uuid: string, colName: string, value: any) => void
}

const TableNodeExt = (props: Props) => {
  const { columns, data, onChange, disabled } = props
  const { t } = useTranslation()

  return (
    <DataGrid className="table-node-ext--data-grid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
      {columns.map((column) => {
        return (
          <DataColumn head key={`${column.colName}_header`}>
            {t(column.header)}
          </DataColumn>
        )
      })}

      {data.map(({ uuid, props: datum }) => {
        return (
          <React.Fragment key={uuid}>
            {columns.map((column) => {
              const key = `${uuid}_${column.colName}_data`
              return <CellNodeExt key={key} onChange={onChange} disabled={disabled} datum={datum} column={column} />
            })}
          </React.Fragment>
        )
      })}
    </DataGrid>
  )
}

export default TableNodeExt
