import React from 'react'

import { CellProps } from '../CellProps'

const CellMultiselect: React.FC<CellProps & { value: string }> = (props: CellProps & { value: string }) => {
  const { value } = props
  return <div>{Array.isArray(value) ? value?.join(',') : value}</div>
}

export default CellMultiselect
