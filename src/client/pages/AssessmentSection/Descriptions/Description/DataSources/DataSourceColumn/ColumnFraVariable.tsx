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

  const _filterRow = (row: Row) =>
    row.props.variableName && row.props.type === RowType.data && !_allColumnsCalculated(row)

  // Get a list of variables to show form the table
  const rowOptions = table.rows.filter(_filterRow).map((row) => ({
    label: t(Cols.getLabel({ cycle, col: row.cols[0], t })),
    value: row.props.variableName,
  }))

  // Include also the variables from the data source 'include' property
  const options = dataSourceVariables?.include?.reduce((acc, variableName) => {
    const _option = { label: t(variableName), value: variableName }
    const exists = acc.find((option) => t(option.label) === t(_option.label))

    if (!exists) {
      acc.push(_option)
    }
    return acc
  }, rowOptions)

  const _onChange = (value: string[]) => {
    onChange('fraVariables', value)
  }

  return (
    <DataColumn className="data-source-column">
      <MultiSelect disabled={disabled} values={dataSource.fraVariables} options={options} onChange={_onChange} />
    </DataColumn>
  )
}

export default ColumnFraVariable
