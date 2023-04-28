import { Objects } from '@utils/objects'

import { Col, ColProps } from '@meta/assessment'

export interface ColDB {
  id: number
  uuid: string
  props: ColProps
  row_id: number
}

export const ColAdapter = (colDB: ColDB): Col => {
  const {
    props: { calculateFn, classNames, labels, linkedNodes, style, validateFns, variableNo, ...otherProps },
    ...col
  } = colDB

  return {
    ...Objects.camelize(col),
    props: {
      ...Objects.camelize(otherProps),
      calculateFn,
      validateFns,
      classNames,
      labels,
      linkedNodes,
      style,
      variableNo,
    },
  }
}
