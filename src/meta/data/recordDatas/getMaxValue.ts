import { getDatum } from 'meta/data/recordDatas/getDatum'
import { Numbers } from 'utils/numbers'

import { getTableData } from './getTableData'
import { Props } from './props'

type Returned = string | undefined
/**
 * Returns the maximum value for the given table/variable
 */
export const getMaxValue = (props: Omit<Props, 'colName'>): Returned => {
  const { assessmentName, countryIso, cycleName, data, tableName, variableName } = props
  const tableData = getTableData({ assessmentName, cycleName, countryIso, data, tableName })

  return Object.keys(tableData).reduce<Returned>((acc, colName) => {
    const propsDatum = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
    const currentValue = getDatum(propsDatum)

    if (!acc || Numbers.greaterThan(currentValue, acc)) {
      return currentValue
    }
    return acc
  }, undefined)
}
