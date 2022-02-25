import { TableData as TypeTableData } from '@meta/data/index'
import { CountryIso } from '@meta/area'
import { Table } from '@meta/assessment/table'
import { Row } from '@meta/assessment/row'
import { Col } from '@meta/assessment/col'

const getTableData = (props: { data: TypeTableData; countryIso: CountryIso; table: Table }) => {
  const { countryIso, table, data } = props
  return data[countryIso][table.props.name]
}

const getDatum = (props: { data: TypeTableData; countryIso: CountryIso; table: Table; row: Row; col: Col }) => {
  const { data, countryIso, table, row, col } = props
  const dataTable = getTableData({ data, countryIso, table })
  if (!dataTable) return null
  const { colName } = col.props
  if (!colName) return null
  // const rowName = Objects.camelize(row.props.variableName)
  const { variableName } = row.props
  return data[countryIso][table.props.name]?.[variableName]?.[colName]?.raw
}

export const TableDatas = {
  getTableData,
  getDatum,
}
