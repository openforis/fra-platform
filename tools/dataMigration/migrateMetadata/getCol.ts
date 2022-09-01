import { ColSpec } from '../../../.src.legacy/webapp/sectionSpec'
import { Col, ColType } from '../../../src/meta/assessment/col'
import { Row } from '../../../src/meta/assessment/row'

export const getCol = (props: { cycles: Array<string>; colSpec: ColSpec; row: Row }): Col => {
  const { colSpec, cycles, row } = props
  const col: Col = {
    props: {
      cycles,
      colSpan: colSpec.colSpan,
      rowSpan: colSpec.rowSpan,
      colType: colSpec.type as unknown as ColType,
      index: colSpec.idx,
      colName: colSpec.colName,
      variableNo: colSpec.variableNo,
      calculateFn: colSpec.migration?.calculateFn,
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
  return col
}
