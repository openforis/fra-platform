import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'

import { useCountryIso } from '@client/hooks'

import Table from '../components/Table'

const PrimaryDesignatedManagementObjective = () => {
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const columns = ['1990', '2000', '2010', '2020']
  const rows = [
    'production',
    'multiple_use',
    'conservation_of_biodiversity',
    'protection_of_soil_and_water',
    'social_services',
    'other',
  ]
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const units = isIsoCountry
    ? ['haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand']
    : ['haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion']
  const section = 'primaryDesignatedManagementObjective'

  return (
    <div className="row-l row-table">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table
        variables={rows}
        units={units}
        columns={columns}
        section={section}
        tableNames={['totalAreaWithDesignatedManagementObjective']}
      />
    </div>
  )
}
export default PrimaryDesignatedManagementObjective
