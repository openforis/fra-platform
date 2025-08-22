import { useCallback, useState } from 'react'

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

      setManualCode(digits)

      let matchingCountry = null
      if (digits) {
        // First try to find a prioritized country
        matchingCountry = countries.find(
          (country) => country.callingCode === digits && priorityList.includes(country.countryIso)
        )
        // If no priority match, use the first available match
        if (!matchingCountry) {
          matchingCountry = countries.find((country) => country.callingCode === digits)
        }
      }

      let countryValue = null
      if (matchingCountry) countryValue = `${digits}:${matchingCountry.countryIso}`

      setSelectedCountry(countryValue)
      onChange?.(digits)
    },
    [countries, onChange]
  )

  return {
    selectedCountry,
    manualCode,
    handleCountryChange,
    handleManualCodeChange,
  }
}
