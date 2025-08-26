import { useEffect, useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { useOnMount } from 'client/hooks/useOnMount'

type Props = {
  fieldName: string
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
}

type Returned = {
  callingCode: string
  phoneNumber: string
  setCallingCode: (code: string) => void
  setPhoneNumber: (number: string) => void
}

export const useTelephoneFieldState = (props: Props): Returned => {
  const { fieldName, setValue, watch } = props

  const [callingCode, setCallingCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const formValue = watch(fieldName)

  // Set initial state by parsing formValue
  useOnMount(() => {
    if (formValue && !callingCode && !phoneNumber) {
      const match = formValue.match(/^\+(\d+)\s+(.+)$/)

      if (match) {
        const code = match.at(1)
        const number = match.at(2)
        setCallingCode(code)
        setPhoneNumber(number)
      } else {
        setPhoneNumber(formValue)
      }
    }
  })

  // Update form on phone number change - NOTE: Calling code not required (e.g. internal numbers: 06123)
  useEffect(() => {
    if (phoneNumber) {
      const value = callingCode ? `+${callingCode} ${phoneNumber}` : phoneNumber
      setValue(fieldName, value, { shouldDirty: true, shouldTouch: true })
    } else {
      setValue(fieldName, '', { shouldDirty: true, shouldTouch: true })
    }
  }, [callingCode, fieldName, phoneNumber, setValue])

  return { callingCode, phoneNumber, setCallingCode, setPhoneNumber }
}
