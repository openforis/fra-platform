// Forest growing stock and carbon
import { Cycle, Row, Table, TableNames } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getCols, getStyle } from 'client/pages/CountryHome/Overview/meta/utils'

const cols = ['1990', '2000', '2010', '2020']

const _getTable = (cycle: Cycle): Table => {
  const headerRow = {
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
          colName: '2000',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 3,
          colName: '2010',
          colType: 'header',
        },
      },
      {
        rowId: 89,
        props: {
          index: 4,
          colName: '2020',
          colType: 'header',
        },
      },
    ],
    tableId: 13,
    props: {
      type: 'header',
      index: 'header_1',
      cycles: [cycle.uuid],
    },
  } as Row

  const rowTotalGrowingStock = {
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
        [cycle.uuid]: `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground `,
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
        [cycle.uuid]: `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground + ${TableNames.carbonStock}.carbon_forest_deadwood + ${TableNames.carbonStock}.carbon_forest_litter + ${TableNames.carbonStock}.carbon_forest_soil`,
      },
    },
  } as Row

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
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_below_ground',
        },
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_above_ground',
        },
      ],
      carbonStockTotal: [
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_above_ground',
        },
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_below_ground',
        },
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_deadwood',
        },
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_litter',
        },
        {
          tableName: TableNames.carbonStock,
          variableName: 'carbon_forest_soil',
        },
      ],
    },
    props: {
      name: 'growingStockTotalDashboard2020',
      cycles: [cycle.uuid],
      dataExport: false,
      columnNames: {
        [cycle.uuid]: cols,
      },
    },
    rows,
  } as Table

  return table
}

export const forestGrowingStockAndCarbonDashboard2020 = (cycle: Cycle): DashboardTable => ({
  type: DashboardItemType.table,
  title: { key: 'statisticalFactsheets.carbonAndGrowingStock.title' },
  table: _getTable(cycle),
})
