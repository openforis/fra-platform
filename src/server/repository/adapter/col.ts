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
    props: { classNames, labels, style, variableNo, calculateFn, validateFns, ...rest },
    ...col
  } = colDB

  return {
    ...Objects.camelize(col),
    props: {
      ...Objects.camelize(rest),
      calculateFn,
      validateFns,
      classNames,
      labels,
      style,
      variableNo,
    },
  }
}
