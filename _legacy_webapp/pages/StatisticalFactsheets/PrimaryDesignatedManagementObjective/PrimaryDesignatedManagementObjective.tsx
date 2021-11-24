import React from 'react'
import { useI18n } from '../../../hooks'
import { Areas } from '@core/country'
import Table from '../components/table'

type Props = {
  levelIso: string
}
const PrimaryDesignatedManagementObjective = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const columns = ['rowName', '1990', '2000', '2010', '2020']
  const rows = [
    'production',
    'multiple_use',
    'conservation_of_biodiversity',
    'protection_of_soil_and_water',
    'social_services',
    'other',
  ]
  const isIsoCountry = Areas.isISOCountry(levelIso)
  const units = isIsoCountry
    ? ['haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand']
    : ['haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion']
  const section = 'primaryDesignatedManagementObjective'
  return (
    <div className="row-l row-table">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table
        isIsoCountry={isIsoCountry}
        rows={rows}
        units={units}
        columns={columns}
        section={section}
        levelIso={levelIso}
      />
    </div>
  )
}
export default PrimaryDesignatedManagementObjective
