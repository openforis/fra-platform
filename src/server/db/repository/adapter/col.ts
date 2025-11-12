import { Objects } from 'utils/objects'

import { Col, ColProps } from 'meta/assessment/col'
import { UUID } from 'meta/uuid'

export interface ColDB {
  id: number
  uuid: string
  props: ColProps
  row_uuid: UUID
}

export const ColAdapter = (colDB: ColDB): Col => {
  const {
    props: {
      calculateClientSide,
      calculateFn,
      classNames,
      colNameSort,
      enableIf,
      labels,
      linkedNodes,
      select,
      style,
      validateFns,
      variableNo,
      ...otherProps
    },
    ...col
  } = colDB

  return {
    ...Objects.camelize(col),
    props: {
      ...Objects.camelize(otherProps),
      calculateClientSide,
      calculateFn,
      classNames,
      colNameSort,
      enableIf,
      labels,
      linkedNodes,
      select,
      style,
      validateFns,
      variableNo,
    },
  }
}
