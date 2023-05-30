import { NodeValue } from '@meta/assessment'

import { getTableData } from './getTableData'
import { Props } from './props'

export const getNodeValue = (props: Props): NodeValue => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] ?? ({} as NodeValue)
}
