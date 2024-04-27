import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'
import { NodeExt, NodeExtCellType } from 'meta/nodeExt'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'

import { NodeExtCell } from './types'

type Props = {
  columns: Array<NodeExtCell<NodeExtCellType>>
  data: Array<NodeExt<unknown>>
  disabled: boolean
  gridTemplateColumns: string
  onChange: (value: string | Array<string>) => void
}

const TableNodeExt = (props: Props) => {
  const { columns, data, onChange, disabled, gridTemplateColumns } = props
  const { t } = useTranslation()

  return (
    <DataGrid gridTemplateColumns={gridTemplateColumns}>
      {columns.map((column, i) => {
        const { header } = column.props
        return (
          <DataCell key={`${String(i)}_header`} header lastCol={i === columns.length - 1}>
            {Labels.getLabel({ label: header.label, t })}
          </DataCell>
        )
      })}

      {data.map((nodeExt, i) => {
        const key = `nodeExt_${nodeExt.uuid}`
        return (
          <React.Fragment key={key}>
            {columns.map((column, j) => {
              return (
                <DataCell
                  key={key}
                  editable={!disabled}
                  lastCol={j === columns.length - 1}
                  lastRow={i === data.length - 1}
                >
                  <CellNodeExt column={column} disabled={disabled} nodeExt={nodeExt} onChange={onChange} />
                </DataCell>
              )
            })}
          </React.Fragment>
        )
      })}
    </DataGrid>
  )
}

export default TableNodeExt
