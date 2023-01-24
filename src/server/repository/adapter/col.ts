import { Objects } from '@utils/objects'

import { Col, ColProps } from '@meta/assessment'

export interface ColDB {
  id: number
  uuid: string
  props: ColProps
  row_id: number
}

export const ColAdapter = (
  { props: { labels, style, variableNo, calculateFn, validateFns, ...rest }, ...col }: ColDB,
  _?: unknown,
  __?: unknown
): Col => {
  return {
    ...Objects.camelize(col),
    props: {
      ...Objects.camelize(rest),
      calculateFn,
      validateFns,
      labels,
      style,
      variableNo,
    },
  }
}
