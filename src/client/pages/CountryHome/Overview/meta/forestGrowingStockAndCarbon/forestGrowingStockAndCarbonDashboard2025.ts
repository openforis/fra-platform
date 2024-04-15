// Forest growing stock and carbon
import { Cycle, Table, TableNames } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getCols, getStyle } from 'client/pages/CountryHome/Overview/meta/utils'

const cols = ['1990', '2000', '2010', '2020', '2025']
const _getTable = (cycle: Cycle): Table => {
  const headerRow = {
    id: 89,
    cols: [
      {
        rowId: 88,
        props: {
          index: 0,
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 1,
          colName: '1990',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 2,
          cycles: [cycle.uuid],
          colName: '2000',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 3,
          cycles: [cycle.uuid],
          colName: '2010',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 4,
          cycles: [cycle.uuid],
          colName: '2020',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 5,
          cycles: [cycle.uuid],
          colName: '2025',
          colType: 'header',
          style: getStyle(cycle),
        },
      },
    ],
    tableId: 13,
    props: {
      type: 'header',
      index: 'header_1',
      cycles: [cycle.uuid],
    },
  }
  const rowTotalGrowingStock = {
    cols: [
      {
        id: 548,
        uuid: '3fff93c4-63bd-452d-8b0b-e7eaa9a61bc8',
        rowId: 96,
        props: {
          index: 'header_0',
          cycles: [cycle.uuid],
          colType: 'header',
          // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
          labels: {
            [cycle.uuid]: {
              key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total',
            },
          },
          style: getStyle(cycle),
        },
      },
      ...getCols(cycle, cols),
    ],
    tableId: 13,
    props: {
      type: 'data',
      index: 6,
      label: {
        key: 'growingStock.forest',
      },
      cycles: [cycle.uuid],
      readonly: false,
      variableName: 'forest',
      calculateFn: {
        [cycle.uuid]: 'growingStockTotal.forest',
      },
    },
  }
  const rowCarbonStockInBiomass = {
    cols: [
      {
        id: 548,
        uuid: '3fff93c4-63bd-452d-8b0b-e7eaa9a61bc8',
        rowId: 96,
        props: {
          index: 'header_0',
          cycles: [cycle.uuid],
          colType: 'header',
          // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
          labels: {
            [cycle.uuid]: {
              key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total',
            },
          },
          style: getStyle(cycle),
        },
      },
      ...getCols(cycle, cols),
    ],
    tableId: 13,
    props: {
      type: 'data',
      index: 6,
      label: {
        key: 'growingStock.forest',
      },
      cycles: [cycle.uuid],
      readonly: false,
      variableName: 'carbonStockBiomassTotal',
      calculateFn: {
        [cycle.uuid]: `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground `,
      },
    },
  }
  const rowCarbonStockTotal = {
    cols: [
      {
        rowId: 96,
        props: {
          index: 'header_0',
          cycles: [cycle.uuid],
          colType: 'header',
          // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
          labels: {
            [cycle.uuid]: {
              key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total',
            },
          },
          style: getStyle(cycle),
        },
      },
      ...getCols(cycle, cols),
    ],
    tableId: 13,
    props: {
      type: 'data',
      index: 6,
      label: {
        key: 'growingStock.forest',
      },
      cycles: [cycle.uuid],
      readonly: false,
      variableName: 'carbonStockTotal',
      calculateFn: {
        [cycle.uuid]: `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground + ${TableNames.carbonStockAvg}.carbon_forest_deadwood + ${TableNames.carbonStockAvg}.carbon_forest_litter + ${TableNames.carbonStockAvg}.carbon_forest_soil`,
      },
    },
  }

  const rows = [headerRow, rowTotalGrowingStock, rowCarbonStockInBiomass, rowCarbonStockTotal]

  const table = {
    tableSectionId: -1, // 10,
    calculationDependencies: {
      forest: [
        {
          tableName: 'growingStockTotal',
          variableName: 'forest',
        },
      ],
      carbonStockBiomassTotal: [
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_above_ground',
          cycleName: '2025',
        },

        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_below_ground',
          cycleName: '2025',
        },
      ],
      carbonStockTotal: [
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_above_ground',
          cycleName: '2025',
        },
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_below_ground',
          cycleName: '2025',
        },
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_deadwood',
          cycleName: '2025',
        },
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_litter',
          cycleName: '2025',
        },
        {
          tableName: TableNames.carbonStockAvg,
          variableName: 'carbon_forest_soil',
          cycleName: '2025',
        },
      ],
    },
    props: {
      odp: false,
      name: 'growingStockTotalDashboard',
      // unit: don't define unit, we have 2 units: 'millionsCubicMeterOverBark', tonnes per ha,
      cycles: [cycle.uuid],
      dataExport: true,
      columnNames: {
        [cycle.uuid]: cols,
      },
    },
    rows,
  } as Table

  return table
}

export const forestGrowingStockAndCarbonDashboard2025 = (cycle: Cycle): DashboardTable => ({
  type: DashboardItemType.table,
  title: { key: 'statisticalFactsheets.carbonAndGrowingStock.title' },
  table: _getTable(cycle),
})
