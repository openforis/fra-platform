import { Col, ColStyle, ColType } from '../../../src/meta/assessment/col'
import { Row } from '../../../src/meta/assessment/row'
import { ColSpec } from '../../../src/test/sectionSpec'

export const getCol = (props: {
  cycles: Array<string>
  colSpec: ColSpec
  row: Row
}): Col & { forceColName?: boolean } => {
  const { colSpec, cycles, row } = props
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
  if (typeof colSpec.label === 'string' || colSpec.labelKey || colSpec.labelParams || colSpec.labelPrefixKey) {
    col.props.label = {
      key: colSpec.labelKey,
      params: colSpec.labelParams,
      label: colSpec.label,
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
