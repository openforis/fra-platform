import { Col, ColStyle, ColType, Cycle, CycleUuid } from 'meta/assessment'

export const getStyle = (cycle: Cycle): Record<CycleUuid, ColStyle> => {
  return {
    [cycle.uuid]: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
}

export const getCols = (cycle: Cycle, cols: Array<string>): Array<Col> => {
  return cols.map((col) => {
    return {
      rowId: 96,
      props: {
        cycles: [cycle.uuid],
        colName: col,
        colType: ColType.decimal,
        style: getStyle(cycle),
      },
    }
  })
}
