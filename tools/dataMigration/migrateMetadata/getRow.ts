import { Assessment, Row, RowType, Table } from '../../../src/meta/assessment'
import { RowSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids } from './utils'

export const getRow = (props: { assessment: Assessment; rowSpec: RowSpec; table: Table }): Row => {
  const { assessment, rowSpec, table } = props
  const linkToSection = rowSpec.cols?.[0]?.linkToSection

  const row: Row = {
    props: {
      cycles: getCycleUuids({ assessment, parentCycleUuids: table.props.cycles, migration: rowSpec.migration }),
      index: rowSpec.idx,
      linkToSection,
      type: rowSpec.type as unknown as RowType,
      variableName: rowSpec.variableName, // ?? rowSpec.variableExport,
      calculateFn: rowSpec.migration?.calcFormula,
      readonly: rowSpec.migration?.readonly,
      validateFns: rowSpec.migration?.validateFns,
    },
    cols: [],
    tableId: table.id,
  }
  if (rowSpec.chartProps) {
    row.props.chart = rowSpec.chartProps
  }

  if (rowSpec.labelKey) {
    row.props.label = { ...row.props.label, key: rowSpec.labelKey }
  }
  if (rowSpec.labelPrefixKey) {
    row.props.label = { ...row.props.label, prefix: rowSpec.labelPrefixKey }
  }
  if (rowSpec.labelParams) {
    row.props.label = { ...row.props.label, params: rowSpec.labelParams }
  }
  if (rowSpec.migration?.format) {
    row.props.format = rowSpec.migration.format
  }
  return row
}
