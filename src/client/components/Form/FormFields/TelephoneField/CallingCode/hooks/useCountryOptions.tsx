import React from 'react'

import { useCountries } from 'client/store/area/hooks/countries'
import Option from 'client/components/Form/FormFields/TelephoneField/CallingCode/Option'
import { OptionElement } from 'client/components/Inputs/Select/types'

export const useCountryOptions = (): Array<OptionElement> => {
  const countries = useCountries()

  return countries.map((country) => {
    const { callingCode, countryIso } = country

    // Returns e.g. { label: OptionElement, value: '358:FIN' }
    return {
      label: <Option country={country} />,
      value: `${callingCode}:${countryIso}`,
    }
  })
}
