import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols, ColType, DataSource, RowType, Table } from '@meta/assessment'
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

  const variableOptions = table.rows.reduce((acc, row) => {
    if (
      row.props.variableName &&
      row.props.type === RowType.data &&
      !row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))
    ) {
      const _option = {
        label: t(Cols.getLabel({ cycle, col: row.cols[0], t })),
        value: row.props.variableName,
      }
      const exists = acc.find((option) => t(option.label) === t(_option.label))

      if (!exists) {
        acc.push(_option)
      }
    }
    return acc
  }, [] as { label: string; value: string }[])

  // Include also the variables from the data source 'include' property
  const options = (dataSourceVariables?.include ?? []).reduce((acc, customKey) => {
    const _option = { label: t(customKey), value: customKey }
    const exists = acc.find((option) => t(option.label) === t(_option.label))

    if (!exists) {
      acc.push(_option)
    }
    return acc
  }, variableOptions)

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
