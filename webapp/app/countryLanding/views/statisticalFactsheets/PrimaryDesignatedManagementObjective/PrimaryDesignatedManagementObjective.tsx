import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import { Area } from '@common/country'
import Table from '../components/table'

const PrimaryDesignatedManagementObjective = (props) => {
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
  const units = Area.isISOCountry(levelIso)
    ? ['haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand', 'haThousand']
    : ['haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion', 'haMillion']
  const section = 'primaryDesignatedManagementObjective'

  return (
    <div className="row-l">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table rows={rows} units={units} columns={columns} section={section} levelIso={levelIso} />
    </div>
  )
}

PrimaryDesignatedManagementObjective.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default PrimaryDesignatedManagementObjective
