import './CallingCode.scss'
import React from 'react'

import { DataCell } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'
import Select from 'client/components/Inputs/Select'

import { useCountryOptions } from './hooks/useCountryOptions'
import { useFormatOptionLabel } from './hooks/useFormatOptionLabel'
import { useHandleCountryChange } from './hooks/useHandleCountryChange'

type Props = {
  id?: string
  disabled: boolean
  value?: string
  onChange?: (callingCode: string) => void
}

const CallingCode: React.FC<Props> = (props) => {
  const { disabled, id, onChange, value } = props

  const countryOptions = useCountryOptions()
  const formatOptionLabel = useFormatOptionLabel()

  const { handleCountryChange, handleManualCodeChange, manualCode, selectedCountry } = useHandleCountryChange({
    value,
    onChange,
  })

  return (
    <>
      <DataCell noBorder>
        <Select
          classNames={{ container: 'calling-code-select' }}
          disabled={disabled}
          formatOptionLabel={formatOptionLabel}
          isClearable
          onChange={handleCountryChange}
          options={countryOptions}
          value={selectedCountry}
        />
      </DataCell>
      <DataCell noBorder>
        <div className="calling-code__input-wrapper">
          <span>+</span>
          <InputText
            className="calling-code__manual-input"
            disabled={disabled}
            id={`${id}-phone-number-prefix`}
            onChange={handleManualCodeChange}
            value={manualCode}
          />
        </div>
      </DataCell>
    </>
  )
}

export default CallingCode
