import './carbonGrowingStock.less'
import React from 'react'
import PropTypes from 'prop-types'
import Table from '../components/table'

const CarbonGrowingStock = (props) => {
  const { levelIso } = props

  const tableHeads = ['rowName', '1990', '2000', '2010', '2020']

  return (
    <div className="statistical-factsheets-carbon-growing-stock">
      <h3 className="header">Carbon and Growing Stock (1900 - 2000)</h3>

      <Table tableHeads={tableHeads} url={`/api/statisticalFactsheets/carbonAndGrowingStock/${levelIso}`} />
    </div>
  )
}

CarbonGrowingStock.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default CarbonGrowingStock
