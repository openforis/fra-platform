import React from 'react'

import { CellValueMultiProps } from '../CellProps'

const CellMultiselect: React.FC<CellValueMultiProps> = (props: CellValueMultiProps) => {
  const { value } = props
  return <div>{value.join(',')}</div>
}

export default CellMultiselect
