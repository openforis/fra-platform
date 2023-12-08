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
}

const TableNodeExt = (props: Props) => {
  const { columns, data, onChange, disabled } = props
  const { t } = useTranslation()

  return (
    <DataGrid gridTemplateColumns={`repeat(${columns.length}, auto)`}>
      {columns.map((column, i) => {
        const { colName, header } = column.props
        return (
          <DataCell lastCol={i === columns.length - 1} header key={`${colName}_header`}>
            {Labels.getLabel({ label: header.label, t })}
          </DataCell>
        )
      })}

      {data.map(({ uuid, props: datum }, i) => {
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
                  disabled={disabled}
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
