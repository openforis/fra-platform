import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { SortOrder } from './types'

interface Props {
  assessmentName: AssessmentName
  colName: ColName
  countryIso: CountryIso
  cycle: Cycle
  data: RecordAssessmentData
  sortOrder: SortOrder
  table: Table
}

const _containsRow = (table: Table, row: Row, cycle: Cycle): boolean => {
  return table.props.sort[cycle.uuid].rowNames.includes(row.props.variableName)
}

const _compareValues = (a: string, b: string): number => {
  const numA = Numbers.toBigNumber(a)
  const numB = Numbers.toBigNumber(b)

  if (numA.isFinite() && numB.isFinite()) {
    return Numbers.compare(numA, numB)
  }

  return a.localeCompare(b)
}

export const createSortFn = (props: Props): ((rowA: Row, rowB: Row) => number) => {
  const { assessmentName, colName, countryIso, cycle, data, sortOrder, table } = props

  return (rowA: Row, rowB: Row): number => {
    // Don't sort the row if either missing the prop or not included in this sorting
    if (!_containsRow(table, rowA, cycle) || !_containsRow(table, rowB, cycle)) {
      return 0
    }

    const variableNameA = rowA.props.variableName
    const variableNameB = rowB.props.variableName

    const tableName = table.props.name
    const baseProps = { assessmentName, colName, countryIso, cycleName: cycle.name, data, tableName }

    const valueA = RecordAssessmentDatas.getDatum({ ...baseProps, variableName: variableNameA })
    const valueB = RecordAssessmentDatas.getDatum({ ...baseProps, variableName: variableNameB })

    if (Objects.isNil(valueA) && Objects.isNil(valueB)) return 0
    if (Objects.isNil(valueA)) return 1
    if (Objects.isNil(valueB)) return -1

    const comparison = _compareValues(valueA, valueB)

    // revert sorting order if desc
    return sortOrder === SortOrder.ASC ? comparison : -comparison
  }
}
