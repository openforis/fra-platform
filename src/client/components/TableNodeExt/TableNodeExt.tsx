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
  onChange: (rowIndex: number, colName: string, value: unknown) => void
}

const TableNodeExt: React.FC<Props> = (props: Props) => {
  const { columns, data, onChange, disabled } = props
  const { t } = useTranslation()

  return (
    <DataGrid className="table-node-ext--data-grid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
      {columns.map((column) => {
        const { colName, header } = column.props
        return (
          <DataColumn head key={`${colName}_header`}>
            {t(header)}
          </DataColumn>
        )
      })}

      {data.map((data, rowIndex) => {
        const { value: datum, props } = data

        return (
          <React.Fragment key={`row_${String(rowIndex)}`}>
            {columns.map((column, colIndex) => {
              const { colName } = column.props
              const { readOnly } = props as { readOnly?: boolean }
              const key = `${colName}_${String(rowIndex)}_${String(colIndex)}`

              const _disabled = Boolean(disabled || readOnly)

              return (
                <CellNodeExt
                  rowIndex={rowIndex}
                  key={key}
                  onChange={onChange}
                  disabled={_disabled}
                  datum={datum}
                  column={column}
                />
              )
            })}
          </React.Fragment>
        )
      })}
    </DataGrid>
  )
}

export default TableNodeExt
