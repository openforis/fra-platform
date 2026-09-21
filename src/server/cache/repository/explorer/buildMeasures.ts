import { ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Cycle } from 'meta/assessment/cycle'
import { Label } from 'meta/assessment/label'
import { Row, RowType } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { ExplorerMeasure } from 'meta/explorer/metadata'
import { Measure } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'
import { Objects } from 'utils/objects'

type Props = {
  cycle: Cycle
  measures: Array<Measure>
  table: Table
}

// Returns the label of a heading row like "Native tree species" in 2b
const _getHeadingLabel = (props: { cycle: Cycle; row: Row }): Label | undefined => {
  const { cycle, row } = props

  const isHeaderOrDataRow = [RowType.header, RowType.data].includes(row.props.type)
  const headerCol = row.cols?.find((col) => col.props.colType === ColType.header)
  if (!isHeaderOrDataRow || !headerCol) return undefined

  const label = headerCol.props.labels?.[cycle.uuid]
  const { colSpan = 1 } = Cols.getStyle({ col: headerCol, cycle })
  // column header rows also have a label but span a single column
  if (Objects.isEmpty(label) || colSpan <= 1) return undefined

  return label
}

// Gives each measure the group and nesting level of its table row
export const buildMeasures = (props: Props): Array<ExplorerMeasure> => {
  const { cycle, measures, table } = props
  const tableName = table.props.name
  const rows = table.rows ?? []

  const result: Array<ExplorerMeasure> = []
  let group: Label | undefined

  rows.forEach((row) => {
    const { categoryLevel = 0, variableName } = row.props

    // a row without a variable is either a heading that opens a new group or a layout row we skip
    if (Objects.isEmpty(variableName)) {
      const label = _getHeadingLabel({ cycle, row })
      if (label) group = label
      return
    }

    const measureName = Measures.variableNameToMeasureName(tableName, variableName)
    const measure = measures.find((candidate) => candidate.name === measureName)
    // a variable without a measure isn't shown in the explorer
    if (!measure) return

    // the nested rows after a heading belong to its group, like the ranks under "Native tree species" in 2b
    const isGroupMember = Boolean(group) && categoryLevel > 0
    // the heading already counts as one level, so a group member starts one level lower
    const level = isGroupMember ? categoryLevel - 1 : categoryLevel

    const explorerMeasure: ExplorerMeasure = { ...measure }
    if (isGroupMember) explorerMeasure.group = group
    if (level > 0) explorerMeasure.level = level
    result.push(explorerMeasure)
  })

  return result
}
