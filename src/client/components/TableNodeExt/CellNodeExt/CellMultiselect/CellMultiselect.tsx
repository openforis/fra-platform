import React from 'react'

import { CellProps } from '../CellProps'

const CellMultiselect: React.FC<CellProps & { value: Array<string> }> = (
  props: CellProps & { value: Array<string> }
) => {
  const { value } = props
  return <div>{value.join(',')}</div>
}

export default CellMultiselect
