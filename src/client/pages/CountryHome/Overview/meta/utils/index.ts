import { UUIDs } from 'utils/uuids'

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
  return cols.map((col, index) => {
    return {
      id: -1 - index,
      uuid: UUIDs.v4(),
      rowId: 96,
      props: {
        index,
        cycles: [cycle.uuid],
        colName: col,
        colType: ColType.decimal,
        style: getStyle(cycle),
      },
    }
  })
}
