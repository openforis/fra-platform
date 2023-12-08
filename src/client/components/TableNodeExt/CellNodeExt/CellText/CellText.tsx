import React from 'react'

import TextInput from 'client/components/Inputs/InputText'

import { CellValueSingleProps } from '../CellProps'

const CellText: React.FC<CellValueSingleProps> = (props: CellValueSingleProps) => {
  const { value, onChange, disabled } = props

  return <TextInput disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} />
}

export default CellText
