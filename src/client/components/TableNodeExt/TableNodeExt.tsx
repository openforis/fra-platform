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
          <DataCell lastCol={i === columns.length - 1} header key={`${String(i)}_header`}>
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
                <CellNodeExt
                  column={column}
                  disabled={disabled}
                  key={key}
                  lastCol={j === columns.length - 1}
                  lastRow={i === data.length - 1}
                  nodeExt={nodeExt}
                  onChange={onChange}
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
