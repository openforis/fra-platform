import React from 'react'

import { CellMultiselectProps } from '../CellProps'

const CellMultiselect: React.FC<CellMultiselectProps> = (props: CellMultiselectProps) => {
  const { value } = props
  return <div>{value.join(',')}</div>
}

export default CellMultiselect
