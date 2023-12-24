import React from 'react'

import Select from 'client/components/Inputs/Select'

import { CellSelectProps } from '../CellProps'

const CellMultiselect: React.FC<CellSelectProps> = (props) => {
  const { column, disabled, nodeExt, onChange } = props

  const { options } = column.props
  const value = nodeExt.value.raw

  return <Select disabled={disabled} isMulti onChange={onChange} options={options} value={value} />
}

export default CellMultiselect
