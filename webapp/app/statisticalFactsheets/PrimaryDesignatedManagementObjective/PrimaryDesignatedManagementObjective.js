import './primaryDesignatedManagementObjective.less'
import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import Table from '../components/table'

const PrimaryDesignatedManagementObjective = (props) => {
  const { levelIso } = props
  const i18n = useI18n()

  const tableHeads = ['rowName', '1990', '2000', '2010', '2020']
  const section = 'primaryDesignatedManagementObjective'

  return (
    <div className="statistical-factsheets-naturally-primary-designated-management-objective">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table tableHeads={tableHeads} section={section} levelIso={levelIso} />
    </div>
  )
}

PrimaryDesignatedManagementObjective.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default PrimaryDesignatedManagementObjective
