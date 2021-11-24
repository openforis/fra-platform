import React from 'react'
import { useSelector } from 'react-redux'

import { PropsCell } from '../props'

const Calculated: React.FC<PropsCell> = (props) => {
  const { col, rowIdx } = props
  const { calculateFn, formatFn } = col

  const value = useSelector(calculateFn(col.idx as number, rowIdx))

  return <div>{formatFn(value)}</div>
}

export default Calculated
