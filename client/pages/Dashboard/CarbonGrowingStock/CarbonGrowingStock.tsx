import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'

import { useCountryIso } from '@client/hooks'

import Table from '../components/Table'

const CarbonGrowingStock = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const columns = ['rowName', '1990', '2000', '2010', '2020']
  const variables = ['growingStockTotal', 'carbonStockBiomassTotal', 'carbonStockTotal']
  const units = isIsoCountry
    ? ['millionsCubicMeterOverBark', 'tonnesPerHa', 'tonnesPerHa']
    : ['billionCubicMeter', 'gt', 'gt']
  const tableNames = ['carbonAndGrowingStock']
  const section = 'carbonAndGrowingStock'

  // TODO Missing data
  /*
  Growing stock (billion m³)
  Carbon stock in biomass (Gt)?
  Total carbon stock
  * */

  return (
    <div className="row-m row-table">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.${tableNames}.title`)}</h3>

      <Table columns={columns} variables={variables} units={units} tableNames={tableNames} section={section} />
    </div>
  )
}
export default CarbonGrowingStock
