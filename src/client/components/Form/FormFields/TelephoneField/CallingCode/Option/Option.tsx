import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, Country } from 'meta/area'

import { DataCell, DataGrid } from 'client/components/DataGrid'

import FlagIcon from '../FlagIcon'

type Props = {
  country: Country
}

const Option: React.FC<Props> = (props) => {
  const { country } = props
  const { t } = useTranslation()

  const countryName = t(Areas.getTranslationKey(country.countryIso))

  return (
    <DataGrid className="calling-code__option" gridTemplateColumns="24px 1fr auto">
      <DataCell noBorder>
        <FlagIcon countryIso={country.countryIso} />
      </DataCell>
      <DataCell noBorder>{countryName}</DataCell>
      <DataCell noBorder>(+{country.callingCode})</DataCell>
    </DataGrid>
  )
}

export default Option
