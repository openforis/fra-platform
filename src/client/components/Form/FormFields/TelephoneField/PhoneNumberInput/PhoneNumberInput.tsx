import React from 'react'

import { DataCell } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'

type Props = {
  id?: string
  disabled: boolean
  value: string
  onChange: (value: string) => void
}

const PhoneNumberInput: React.FC<Props> = (props) => {
  const { disabled, id, onChange, value } = props

  return (
    <DataCell noBorder>
      <InputText
        disabled={disabled}
        id={`${id}-phone-number`}
        onChange={(e): void => onChange(e.target.value)}
        value={value}
      />
    </DataCell>
  )
}

export default PhoneNumberInput
