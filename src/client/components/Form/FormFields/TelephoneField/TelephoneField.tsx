import './TelephoneField.scss'
import React, { ReactNode } from 'react'

import { DataGrid } from 'client/components/DataGrid'
import FormField from 'client/components/Form/FormFields/FormField'
import { FieldProps } from 'client/components/Form/FormFields/types'

import { useTelephoneFieldState } from './hooks/useTelephoneFieldState'
import CallingCode from './CallingCode'
import PhoneNumberInput from './PhoneNumberInput'

type Props = FieldProps

const TelephoneField: React.FC<Props> = (props) => {
  const { fieldDefinition, setValue, watch } = props

  const { callingCode, phoneNumber, setCallingCode, setPhoneNumber } = useTelephoneFieldState({
    fieldName: fieldDefinition.name,
    setValue,
    watch,
  })

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={({ disabled }): ReactNode => (
        <DataGrid gridTemplateColumns="76px 50px 1fr">
          <CallingCode disabled={disabled} onChange={setCallingCode} value={callingCode} />
          <PhoneNumberInput disabled={disabled} onChange={setPhoneNumber} value={phoneNumber} />
        </DataGrid>
      )}
    />
  )
}

export default TelephoneField
