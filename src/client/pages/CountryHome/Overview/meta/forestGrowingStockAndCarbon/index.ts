import { Cycle, TableNames } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const cols: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2020'],
  '2025': ['1990', '2000', '2010', '2020', '2025'],
}

const tableName = 'forestGrowingStockAndCarbonDashboard'
const tableId = 2

const rowMetadata: Record<string, (region: boolean) => RowsMetadata> = {
  '2020': (region) => [
    {
      id: 1,
      variableName: 'forest',
      label: {
        key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total',
        params: { unit: region ? 'unit.billionCubicMeter' : 'unit.millionsCubicMeterOverBark' },
      },
      calculateFn: `growingStockTotal.forest ${region ? '/ 1000' : ''}`,
      calculationDependencies: [{ tableName: 'growingStockTotal', variableName: 'forest' }],
    },
    {
      id: 2,
      variableName: 'carbonStockBiomassTotal',
      label: {
        key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total',
        params: { unit: region ? 'unit.gt' : 'unit.tonnesPerHa' },
      },
      calculateFn: region
        ? `${TableNames.carbonStock}.carbon_stock_biomass_total / 1000000`
        : `${TableNames.carbonStock}.carbon_forest_below_ground + ${TableNames.carbonStock}.carbon_forest_above_ground`,
      calculationDependencies: [
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_above_ground' },
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_below_ground' },
      ],
    },
    {
      id: 3,
      variableName: 'carbonStockTotal',
      label: {
        key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total',
        params: { unit: region ? 'unit.gt' : 'unit.tonnesPerHa' },
      },
      calculateFn: region
        ? `${TableNames.carbonStock}.carbon_stock_total / 1000000`
        : `
${TableNames.carbonStock}.carbon_forest_above_ground + 
${TableNames.carbonStock}.carbon_forest_below_ground + 
${TableNames.carbonStock}.carbon_forest_deadwood + 
${TableNames.carbonStock}.carbon_forest_litter + 
${TableNames.carbonStock}.carbon_forest_soil
      `,
      calculationDependencies: [
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_above_ground' },
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_below_ground' },
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_deadwood' },
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_litter' },
        { tableName: TableNames.carbonStock, variableName: 'carbon_forest_soil' },
      ],
    },
  ],
  '2025': () => [
    {
      id: 1,
      variableName: 'forest',
      label: { key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total' },
      calculateFn: 'growingStockTotal.forest',
      calculationDependencies: [{ tableName: 'growingStockTotal', variableName: 'forest' }],
    },
    {
      id: 2,
      variableName: 'carbonStockBiomassTotal',
      label: { key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total' },
      calculateFn: `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground `,
      calculationDependencies: [
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_above_ground' },
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_below_ground' },
      ],
    },
    {
      id: 3,
      variableName: 'carbonStockTotal',
      label: { key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total' },
      calculateFn: `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground + ${TableNames.carbonStockAvg}.carbon_forest_deadwood + ${TableNames.carbonStockAvg}.carbon_forest_litter + ${TableNames.carbonStockAvg}.carbon_forest_soil`,
      calculationDependencies: [
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_above_ground' },
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_below_ground' },
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_deadwood' },
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_litter' },
        { tableName: TableNames.carbonStockAvg, variableName: 'carbon_forest_soil' },
      ],
    },
  ],
}

export const forestGrowingStockAndCarbonDashboard = (cycle: Cycle, region: boolean): DashboardTable => ({
  type: DashboardItemType.table,
  title: {
    key: 'statisticalFactsheets.carbonAndGrowingStock.title',
    params: { startYear: cols[cycle.name].at(0), endYear: cols[cycle.name].at(-1) },
  },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata[cycle.name](region), tableName }),
})
