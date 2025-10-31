import React from 'react'

import { Areas } from 'meta/area/areas'

import { useCountries } from 'client/store/area/hooks/countries'
import Option from 'client/components/Form/FormFields/TelephoneField/CallingCode/Option'
import { Option as OptionType } from 'client/components/Inputs/Select'

export const useCountryOptions = (): Array<OptionType> => {
  const countries = useCountries()

  return countries
    .filter((c) => !Areas.isAtlantis(c.countryIso))
    .map((country) => {
      const { callingCode, countryIso } = country

      // Returns e.g. { label: Option, value: '358:FIN' }
      return {
        label: <Option country={country} />,
        value: `${callingCode}:${countryIso}`,
      }
    })
}
