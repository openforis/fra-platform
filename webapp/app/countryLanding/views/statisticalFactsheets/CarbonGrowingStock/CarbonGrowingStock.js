import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import Table from '../components/table'

const CarbonGrowingStock = (props) => {
  const { levelIso } = props
  const i18n = useI18n()

  const columns = ['rowName', '1990', '2000', '2010', '2020']
  const rows = ['carbon_stock_biomass_total', 'growing_stock_total', 'carbon_stock_total']
  const section = 'carbonAndGrowingStock'

  return (
    <div className="statistical-factsheets-carbon-growing-stock">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table columns={columns} rows={rows} section={section} levelIso={levelIso} />
    </div>
  )
}

CarbonGrowingStock.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default CarbonGrowingStock
