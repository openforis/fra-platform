import { Assessment } from '../../../src/meta/assessment'
import { Col, ColStyle, ColType } from '../../../src/meta/assessment/col'
import { Row } from '../../../src/meta/assessment/row'
import { ColSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids } from './utils'

export const getCol = (props: {
  assessment: Assessment
  colSpec: ColSpec
  row: Row
}): Col & { forceColName?: boolean } => {
  const { assessment, colSpec, row } = props
  const cycles = getCycleUuids({ assessment, migration: colSpec.migration, parentCycleUuids: row.props.cycles })
  const style = cycles.reduce<Record<string, ColStyle>>(
    (styleAgg, cycle) => ({ ...styleAgg, [cycle]: { colSpan: colSpec.colSpan, rowSpan: colSpec.rowSpan } }),
    {}
  )
  const col: Col & { forceColName?: boolean } = {
    props: {
      cycles,
      colType: colSpec.type as unknown as ColType,
      index: colSpec.idx,
      colName: colSpec.colName,
      variableNo: colSpec.variableNo,
      calculateFn: colSpec.migration?.calculateFn,
      style,
    },
    rowId: row.id,
  }

  // label migration
  const colSpecLabel = colSpec.label ? String(colSpec.label) : undefined
  if (colSpecLabel || colSpec.labelKey || colSpec.labelParams || colSpec.labelPrefixKey) {
    col.props.label = {
      key: colSpec.labelKey,
      params: colSpec.labelParams,
      label: colSpecLabel,
      prefixKey: colSpec.labelPrefixKey,
    }
  }

  // select migration
  if (colSpec.options) {
    col.props.select = {
      labelKeyPrefix: colSpec.optionsLabelKeyPrefix,
      options: colSpec.options.map((o) => ({
        name: o.optionName,
        hidden: o.hidden,
        type: o.type === 'header' ? 'header' : undefined,
      })),
    }
  }
  if (colSpec.migration?.forceColName) {
    col.forceColName = colSpec.migration.forceColName
  }
  return col
}
