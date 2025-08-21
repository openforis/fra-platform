import React from 'react'

import Select from 'client/components/Inputs/Select'

import { useCountryOptions } from './hooks/useCountryOptions'
import { useFormatOptionLabel } from './hooks/useFormatOptionLabel'

type CallingCodeProps = {
  disabled?: boolean
  value?: string | null
  onChange?: (value: string | null) => void
}

const CallingCode: React.FC<CallingCodeProps> = (props) => {
  const { disabled = false, onChange, value } = props

  const countryOptions = useCountryOptions()
  const formatOptionLabel = useFormatOptionLabel()

  return (
    <Select
      classNames={{ container: 'calling-code-select' }}
      disabled={disabled}
      formatOptionLabel={formatOptionLabel}
      isClearable
      onChange={onChange}
      options={countryOptions}
      value={value}
    />
  )
}

export default CallingCode
