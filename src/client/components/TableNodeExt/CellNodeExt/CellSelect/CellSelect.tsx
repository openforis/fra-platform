import React from 'react'

import Select from 'client/components/Inputs/Select'

import { CellProps } from '../CellProps'
import { useValues } from './hooks/useValues'

const CellSelect: React.FC<CellProps & { value: string }> = (props: CellProps & { value: string }) => {
  const { onChange, disabled, column, value: _value } = props

  const { value, options } = useValues({ column, value: _value })

  return <Select disabled={disabled} value={value} onChange={onChange} options={options} />
}

export default CellSelect
