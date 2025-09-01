import { useCallback, useEffect, useState } from 'react'

import { Objects } from 'utils/objects'

import { Country } from 'meta/area'

import { useCountries } from 'client/store/area/hooks/countries'

// Countries with duplicate code
const priorityList = [
  'GBR', // +44 (GGY, IMN, JEY)
  'GLP', // +590 (BLM, MAF)
  'ITA', // +39 (VAT)
  'MAR', // +212 (ESH)
  'NZL', // +64 (PCN)
  'REU', // +262 (MYT)
  'RUS', // +7 (KAZ)
  'USA', // +1 (CAN, DOM, GUM, PRI)
]

type Props = {
  value?: string
  onChange?: (callingCode: string) => void
}

type Returned = {
  selectedCountry: string | null
  manualCode: string
  handleCountryChange: (countryValue: string | null) => void
  handleManualCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useHandleCountryChange = (props: Props): Returned => {
  const { onChange, value } = props
  const countries = useCountries()

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [manualCode, setManualCode] = useState(value || '')

  const findMatchingCountry = useCallback(
    (callingCode: string): Country | undefined => {
      // In case of duplicate codes
      const priorityMatch = countries.find(
        (country) => country.callingCode === callingCode && priorityList.includes(country.countryIso)
      )

      return priorityMatch ?? countries.find((country) => country.callingCode === callingCode)
    },
    [countries]
  )

  const updateManualCode = useCallback(
    (newCode: string): void => {
      setManualCode(newCode)

      if (newCode) {
        const matchingCountry = findMatchingCountry(newCode)
        const countryValue = matchingCountry ? `${newCode}:${matchingCountry.countryIso}` : null
        setSelectedCountry(countryValue)
      } else {
        setSelectedCountry(null)
      }

      onChange?.(newCode)
    },
    [findMatchingCountry, onChange]
  )

  useEffect(() => {
    if (!Objects.isEmpty(value)) {
      updateManualCode(value)
    }
  }, [updateManualCode, value])

  const handleCountryChange = useCallback(
    (countryValue: string | null): void => {
      setSelectedCountry(countryValue)

      if (countryValue) {
        const callingCode = countryValue.split(':')[0]
        setManualCode(callingCode)
        onChange?.(callingCode)
      } else {
        setManualCode('')
        onChange?.('')
      }
    },
    [onChange, setManualCode, setSelectedCountry]
  )

  const handleManualCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // strip all non-numbers
      const digits = e.target.value.replace(/\D/g, '')
      updateManualCode(digits)
    },
    [updateManualCode]
  )

  return {
    selectedCountry,
    manualCode,
    handleCountryChange,
    handleManualCodeChange,
  }
}
