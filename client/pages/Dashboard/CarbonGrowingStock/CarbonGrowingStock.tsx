import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'
import { TableNames } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

import { useCountryIso } from '@client/hooks'
import useStatisticalFactsheetsState from '@client/pages/Dashboard/hooks/useDashboardData'

import Table from '../components/Table'

const CarbonGrowingStock = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  const isIsoCountry = Areas.isISOCountry(countryIso)
  const columns = ['1990', '2000', '2010', '2020']
  const variablesRegion = ['growing_stock_total', 'carbon_stock_biomass_total', 'carbon_stock_total']
  // Country related variables used for calculations.
  const variablesCountryCarbonStock = [
    'carbon_forest_above_ground',
    'carbon_forest_below_ground',
    'carbon_forest_deadwood',
    'carbon_forest_litter',
    'carbon_forest_soil',
  ]

  const variablesCountry = [...variablesCountryCarbonStock, 'forest']
  const variables = isIsoCountry ? variablesCountry : variablesRegion

  const units = isIsoCountry
    ? ['millionsCubicMeterOverBark', 'tonnesPerHa', 'tonnesPerHa']
    : ['billionCubicMeter', 'gt', 'gt']
  const tableNamesCountry = [TableNames.carbonStock, TableNames.growingStockTotal]
  const tableNames = isIsoCountry ? tableNamesCountry : [TableNames.valueAggregate]
  const section = 'carbonAndGrowingStock'

  const { data: _tableData, loaded } = useStatisticalFactsheetsState({
    columns,
    tableNames,
    variables,
  })

  // Note: Calculate values for single countries, regions/global/value_aggregate precalculated.
  // Calculated values:
  //
  // [Not calculated] Growing stock (millionsCubicMeterOverBark)
  // Carbon stock in biomass (tonnesPerHa)
  // Total carbon stock (tonnesPerHa)

  let tableData: TableData = {} as TableData
  if (isIsoCountry) {
    columns.forEach((colName: string) => {
      const carbonForestAboveGround = TableDatas.getDatum({
        variableName: 'carbon_forest_above_ground',
        tableName: TableNames.carbonStock,
        colName,
        countryIso,
        data: _tableData,
      })

      const carbonForestBelowGround = TableDatas.getDatum({
        variableName: 'carbon_forest_below_ground',
        tableName: TableNames.carbonStock,
        colName,
        countryIso,
        data: _tableData,
      })

      const carbonForestDeadwood = TableDatas.getDatum({
        variableName: 'carbon_forest_deadwood',
        tableName: TableNames.carbonStock,
        colName,
        countryIso,
        data: _tableData,
      })

      const carbonForestLitter = TableDatas.getDatum({
        variableName: 'carbon_forest_litter',
        tableName: TableNames.carbonStock,
        colName,
        countryIso,
        data: _tableData,
      })

      const carbonForestSoil = TableDatas.getDatum({
        variableName: 'carbon_forest_soil',
        tableName: TableNames.carbonStock,
        colName,
        countryIso,
        data: _tableData,
      })

      // Variable values

      // Carbon stock in biomass (tonnesPerHa)
      const carbonStockBiomassTotal = Number(carbonForestAboveGround) + Number(carbonForestBelowGround)
      // Total carbon stock (tonnesPerHa)
      const carbonStockTotal =
        Number(carbonForestAboveGround) +
        Number(carbonForestBelowGround) +
        Number(carbonForestDeadwood) +
        Number(carbonForestLitter) +
        Number(carbonForestSoil)

      // [Not calculated] Growing stock (millionsCubicMeterOverBark)
      const growingStockTotal = TableDatas.getDatum({
        variableName: 'forest',
        tableName: TableNames.growingStockTotal,
        colName,
        countryIso,
        data: _tableData,
      })

      tableData = TableDatas.updateDatum({
        data: tableData,
        colName,
        countryIso,
        tableName: TableNames.carbonStock,
        variableName: 'carbon_stock_biomass_total',
        value: { raw: String(carbonStockBiomassTotal) },
      })

      tableData = TableDatas.updateDatum({
        data: tableData,
        colName,
        countryIso,
        tableName: TableNames.carbonStock,
        variableName: 'carbon_stock_total',
        value: { raw: String(carbonStockTotal) },
      })

      tableData = TableDatas.updateDatum({
        data: tableData,
        colName,
        countryIso,
        tableName: TableNames.carbonStock,
        variableName: 'growing_stock_total',
        value: { raw: String(growingStockTotal) },
      })
    })
  } else tableData = _tableData

  return (
    <div className="row-m row-table">
      <h3 className="header">{i18n.t<string>(`statisticalFactsheets.carbonAndGrowingStock.title`)}</h3>

      <Table
        tableData={tableData}
        loaded={loaded}
        columns={columns}
        variables={variablesRegion}
        units={units}
        tableNames={tableNames}
        section={section}
      />
    </div>
  )
}
export default CarbonGrowingStock
