import React, { ReactNode, useCallback } from 'react'

import { useCountries } from 'client/store/area/hooks/countries'
import FlagIcon from 'client/components/Form/FormFields/TelephoneField/CallingCode/FlagIcon'
import { Option } from 'client/components/Inputs/Select'

type Returned = (option: Option, { context }: { context: string }) => ReactNode

// Only show the flag when value selected
export const useFormatOptionLabel = (): Returned => {
  const countries = useCountries()
  return useCallback<Returned>(
    (option: Option, { context }: { context: string }): ReactNode => {
      if (context === 'value') {
        const countryIso = option.value.split(':')[1]
        const country = countries.find((c) => c.countryIso === countryIso)
        return country ? <FlagIcon countryIso={country.countryIso} /> : null
      }
      return option.label
    },
    [countries]
  )
}
