import React from 'react'
import { Areas } from '@core/country'
import { useI18n } from '@webapp/hooks'
import Table from '../components/table'

type Props = {
  levelIso: string
}
const CarbonGrowingStock = (props: Props) => {
  const { levelIso } = props
  const i18n = useI18n()
  const isIsoCountry = Areas.isISOCountry(levelIso)
  const columns = ['rowName', '1990', '2000', '2010', '2020']
  const rows = ['growing_stock_total', 'carbon_stock_biomass_total', 'carbon_stock_total']
  const units = isIsoCountry
    ? ['millionsCubicMeterOverBark', 'tonnesPerHa', 'tonnesPerHa']
    : ['billionCubicMeter', 'gt', 'gt']
  const section = 'carbonAndGrowingStock'
  return (
    <div className="row-m row-table">
      <h3 className="header">{i18n.t(`statisticalFactsheets.${section}.title`)}</h3>

      <Table
        columns={columns}
        rows={rows}
        units={units}
        section={section}
        levelIso={levelIso}
        isIsoCountry={isIsoCountry}
      />
    </div>
  )
}
export default CarbonGrowingStock
