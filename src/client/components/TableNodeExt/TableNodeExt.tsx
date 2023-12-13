import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'
import { NodeExt } from 'meta/nodeExt'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'

import { ColumnNodeExt } from './types'

type Props = {
  columns: Array<ColumnNodeExt>
  data: Array<NodeExt>
  disabled: boolean
  onChange: (uuid: string, colName: string, value: any) => void
  gridTemplateColumns: string
}

const TableNodeExt = (props: Props) => {
  const { columns, data, onChange, disabled, gridTemplateColumns } = props
  const { t } = useTranslation()

  return (
    <DataGrid gridTemplateColumns={gridTemplateColumns}>
      {columns.map((column, i) => {
        const { colName, header } = column.props
        return (
          <DataCell lastCol={i === columns.length - 1} header key={`${colName}_header`}>
            {Labels.getLabel({ label: header.label, t })}
          </DataCell>
        )
      })}

      {data.map(({ uuid, value: datum, props: _props }, i) => {
        const { readOnly } = _props as { readOnly?: boolean }

        return (
          <React.Fragment key={uuid}>
            {columns.map((column, j) => {
              const { colName } = column.props
              const key = `${uuid}_${colName}_data`
              return (
                <CellNodeExt
                  uuid={uuid}
                  key={key}
                  onChange={onChange}
                  disabled={disabled || readOnly}
                  datum={datum}
                  column={column}
                  lastRow={i === data.length - 1}
                  lastCol={j === columns.length - 1}
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
