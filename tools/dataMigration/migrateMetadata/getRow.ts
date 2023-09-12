import { Assessment, Row, RowType, Table } from '../../../src/meta/assessment'
import { ChartProps } from '../../../src/meta/assessment/row'
import { RowSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids } from './utils'

// Return calculateFn prop in format Record<cycleUuid, string>
const _getCalculateFn = (rowSpec: RowSpec, cycles: string[], assessment: Assessment): Record<string, string> => {
  const calculateFn = rowSpec.migration?.calcFormula

  if (!calculateFn) return undefined

  if (typeof calculateFn === 'string') {
    return cycles.reduce<Record<string, string>>((calcFnAgg, cycle) => ({ ...calcFnAgg, [cycle]: calculateFn }), {})
  }

  return Object.entries(calculateFn).reduce<Record<string, string>>(
    (acc, [cycleName, _calculateFn]) => ({
      ...acc,
      [assessment.cycles.find((c) => c.name === cycleName).uuid]: _calculateFn,
    }),
    {}
  )
}

// Return validateFns prop in format Record<cycleUuid, Array<string>>
const _getValidateFns = (rowSpec: RowSpec, cycles: string[], assessment: Assessment): Record<string, Array<string>> => {
  const validateFns = rowSpec.migration?.validateFns

  if (!validateFns) return undefined

  if (Array.isArray(validateFns)) {
    return cycles.reduce<Record<string, Array<string>>>(
      (valiteFnsAgg, cycle) => ({ ...valiteFnsAgg, [cycle]: validateFns }),
      {}
    )
  }

  return Object.entries(validateFns).reduce<Record<string, Array<string>>>(
    (acc, [cycleName, _validateFns]) => ({
      ...acc,
      [assessment.cycles.find((c) => c.name === cycleName).uuid]: _validateFns,
    }),
    {}
  )
}

// Return chartProps prop in format Record<cycleUuid, ChartProps>
const _getChartProps = (rowSpec: RowSpec, assessment: Assessment): Record<string, ChartProps> => {
  const { chartProps } = rowSpec

  if (Array.isArray(rowSpec.migration?.chart?.cycles)) {
    const cycles = rowSpec.migration?.chart?.cycles.map(
      (cycleName) => assessment.cycles.find((c) => c.name === cycleName).uuid
    )
    return cycles?.reduce<Record<string, ChartProps>>(
      (chartPropsAgg, cycle) => ({ ...chartPropsAgg, [cycle]: chartProps }),
      {}
    )
  }

  return assessment.cycles.reduce<Record<string, ChartProps>>(
    (chartPropsAgg, cycle) => ({ ...chartPropsAgg, [cycle.uuid]: chartProps }),
    {}
  )
}

export const getRow = (props: { assessment: Assessment; rowSpec: RowSpec; table: Table }): Row => {
  const { assessment, rowSpec, table } = props
  // const linkToSection = rowSpec.cols?.[0]?.linkToSection
  const cycles = getCycleUuids({ assessment, parentCycleUuids: table.props.cycles, migration: rowSpec.migration })

  const row: Row = {
    props: {
      cycles,
      index: rowSpec.idx,
      // linkToSection,
      type: rowSpec.type as unknown as RowType,
      variableName: rowSpec.variableName ?? rowSpec.variableExport,
      calculateFn: _getCalculateFn(rowSpec, cycles, assessment),
      readonly: rowSpec.migration?.readonly,
      validateFns: _getValidateFns(rowSpec, cycles, assessment),
      dependantsExclude: rowSpec.migration?.dependantsExclude,
      categoryLevel: rowSpec.migration?.categoryLevel,
    },
    cols: [],
    tableId: table.id,
  }
  if (rowSpec.chartProps) {
    row.props.chart = _getChartProps(rowSpec, assessment)
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
