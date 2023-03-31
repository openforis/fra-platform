import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols, ColType, DataSource, Row, RowType, Table } from '@meta/assessment'
import { DataSourceVariables } from '@meta/assessment/description'

import { useCycle } from '@client/store/assessment'
import DataColumn from '@client/components/DataGrid/DataColumn'
import MultiSelect from '@client/components/MultiSelect'

type Props = {
  disabled: boolean
  dataSource: DataSource
  table: Table
  onChange: (key: string, value: string | string[]) => void
  dataSourceVariables: DataSourceVariables
}
const ColumnFraVariable: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange, table, dataSourceVariables } = props
  const cycle = useCycle()

  const { t } = useTranslation()

  const _allColumnsCalculated = (row: Row) =>
    row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))

  const rows = table.rows.reduce<Record<string, string>>((acc, row) => {
    if (row.props.variableName && row.props.type === RowType.data && !_allColumnsCalculated(row)) {
      const label = t(Cols.getLabel({ cycle, col: row.cols[0], t }))
      if (!acc[label]) {
        // eslint-disable-next-line no-param-reassign
        acc[label] = row.props.variableName
      }
    }
    return acc
  }, dataSourceVariables?.include.reduce((acc, variable) => ({ ...acc, [t(variable)]: variable }), {}) ?? {})

  const _onChange = (value: string[]) => {
    onChange(
      'fraVariables',
      value.map((v) => rows[v])
    )
  }

  return (
    <DataColumn className="data-source-column">
      <MultiSelect
        disabled={disabled}
        values={Object.entries(rows).reduce((acc, [label, variable]) => {
          if (dataSource.fraVariables?.includes(variable)) {
            acc.push(label)
          }
          return acc
        }, [])}
        options={Object.keys(rows)}
        onChange={_onChange}
      />
    </DataColumn>
  )
}

export default ColumnFraVariable
