import './primaryDesignatedManagementObjective.less'
import React from 'react'
import PropTypes from 'prop-types'
import Table from '../components/table'

const PrimaryDesignatedManagementObjective = (props) => {
  const { levelIso } = props

  const tableHeads = ['rowName', '1990', '2000', '2010', '2020']

  return (
    <div className="statistical-factsheets-naturally-primary-designated-management-objective">
      <h3 className="header">Primary Designated Management Objective (1990 - 2000)</h3>
      <Table
        tableHeads={tableHeads}
        url={`/api/statisticalFactsheets/primaryDesignatedManagementObjective/${levelIso}`}
      />
    </div>
  )
}

PrimaryDesignatedManagementObjective.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default PrimaryDesignatedManagementObjective
