import React from 'react'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { PropsCell } from '../props'

const Calculated: React.FC<PropsCell> = (props) => {
  const { nodeValue, row } = props

  const value = !Objects.isEmpty(nodeValue.raw) ? Numbers.format(nodeValue.raw, row.props?.format?.integer ? 0 : 2) : ''

  return <div>{value}</div>
}

export default Calculated
