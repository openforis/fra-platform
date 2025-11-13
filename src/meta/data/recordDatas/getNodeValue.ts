import { NodeValue } from 'meta/assessment/node'

import { getTableData } from './getTableData'
import { Props } from './props'

export const getNodeValue = (props: Props): NodeValue => {
  const { assessmentName, colName, countryIso, cycleName, data, tableName, variableName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] ?? ({} as NodeValue)
}
