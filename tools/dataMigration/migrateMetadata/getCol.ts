import { Col, ColType } from '../../../meta/assessment/col'
import { Row } from '../../../meta/assessment/row'
import { ColSpec } from '../../../webapp/sectionSpec'

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
      calculateFn: colSpec.migration?.calculateFn,
    },
    rowId: row.id,
  }
  if (typeof colSpec.label === 'string' || colSpec.labelKey || colSpec.labelParams || colSpec.labelPrefixKey) {
    col.props.label = {
      key: colSpec.labelKey,
      params: colSpec.labelParams,
      label: colSpec.label,
      prefixKey: colSpec.labelPrefixKey,
    }
  }
  return col
}
