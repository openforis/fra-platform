import React from 'react'

import Select from 'client/components/Select'

import { CellProps } from '../CellProps'

const CellSelect: React.FC<CellProps & { value: string }> = (props: CellProps & { value: string }) => {
  const { value, onChange, column, disabled } = props
  const { options } = column.props

  return <Select disabled={disabled} value={value} onChange={onChange} options={options} />
}

export default CellSelect
