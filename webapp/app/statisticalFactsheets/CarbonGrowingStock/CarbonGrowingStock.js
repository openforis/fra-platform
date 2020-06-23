import './carbonGrowingStock.less'
import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import Table from '../components/table'

const CarbonGrowingStock = (props) => {
  const { levelIso } = props
  const i18n = useI18n()

  const tableHeads = ['rowName', '1990', '2000', '2010', '2020']
  const section = 'carbonAndGrowingStock'
  return (
    <div className="statistical-factsheets-carbon-growing-stock">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table tableHeads={tableHeads} section={section} url={`/api/statisticalFactsheets/${section}/${levelIso}`} />
    </div>
  )
}

CarbonGrowingStock.propTypes = {
  levelIso: PropTypes.string.isRequired,
}

export default CarbonGrowingStock
