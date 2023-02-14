import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols, ColType, DataSource, Row, RowType, Table } from '@meta/assessment'

import { useCycle } from '@client/store/assessment'
import DataColumn from '@client/components/DataGrid/DataColumn'
import MultiSelect from '@client/components/MultiSelect'

type Props = {
  disabled: boolean
  dataSource: DataSource
  table: Table
  onChange: (key: string, value: string) => void
}
const ColumnFraVariable: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, onChange, table } = props
  const cycle = useCycle()

  const { t } = useTranslation()

  const _allColumnsCalculated = (row: Row) =>
    row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))

  const rows = table.rows
    ?.filter((row) => row.props.variableName && row.props.type === RowType.data && !_allColumnsCalculated(row))
    .map((r) => t(Cols.getLabel({ cycle, col: r.cols[0], t })))

  const _onChange = (value: any) => {
    onChange('fraVariables', value)
  }

  return (
    <DataColumn className="data-source-column">
      <MultiSelect disabled={disabled} values={dataSource.fraVariables ?? []} options={rows} onChange={_onChange} />
    </DataColumn>
  )
}

export default ColumnFraVariable
