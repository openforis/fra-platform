// Forest growing stock and carbon
import { Cycle, Row, Table, TableNames } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getCols, getStyle } from 'client/pages/CountryHome/Overview/meta/utils'

const cols = ['1990', '2000', '2010', '2020']
const cycle: Cycle = {
  uuid: '66817a08-dc93-4151-b5ed-176d8f04e9b7',
} as Cycle

const headerRow = {
  id: 89,
  cols: [
    {
      id: 470,
      uuid: '71551d4a-4d4e-443f-b0af-db4ad959a489',
      rowId: 88,
      props: {
        index: 0,
        colType: 'header',
      },
    },
    {
      id: 472,
      uuid: '4b17b7d5-4d45-49e1-8676-712f9fa3eda6',
      rowId: 89,
      props: {
        index: 1,
        colName: '1990',
        colType: 'header',
      },
    },
    {
      id: 473,
      uuid: 'efe65f3c-f4e6-462c-a3a7-239270f3c286',
      rowId: 89,
      props: {
        index: 2,
        colName: '2000',
        colType: 'header',
      },
    },
    {
      id: 474,
      uuid: 'c05f6d51-6d59-45bf-a12d-5b4cccef372f',
      rowId: 89,
      props: {
        index: 3,
        colName: '2010',
        colType: 'header',
      },
    },
    {
      id: 480,
      uuid: '13982c8e-c039-4c6b-a5cd-4b69d2c75c05',
      rowId: 89,
      props: {
        index: 4,
        colName: '2020',
        colType: 'header',
      },
    },
  ],
  uuid: '137523ed-1ddf-476f-a0e9-4fa8d04eab38',
  tableId: 13,
  props: {
    type: 'header',
    index: 'header_1',
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
  },
}

const rowTotalGrowingStock = {
  id: 96,
  cols: [
    {
      id: 548,
      uuid: '3fff93c4-63bd-452d-8b0b-e7eaa9a61bc8',
      rowId: 96,
      props: {
        index: 'header_0',
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total',
          },
        },
        style: getStyle(cycle),
      },
    },
    ...getCols(cycle, cols),
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
    readonly: false,
    variableName: 'forest',
    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': 'growingStockTotal.forest',
    },
  },
}
const rowCarbonStockInBiomass = {
  id: -1, // 96,
  cols: [
    {
      id: 548,
      uuid: '3fff93c4-63bd-452d-8b0b-e7eaa9a61bc8',
      rowId: 96,
      props: {
        index: 'header_0',
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total',
          },
        },
        style: getStyle(cycle),
      },
    },
    ...getCols(cycle, cols),
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
    readonly: false,
    variableName: 'carbonStockBiomassTotal',
    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground `,
    },
  },
}
const rowCarbonStockTotal = {
  id: -1, // 96,
  cols: [
    {
      id: 548,
      uuid: '3fff93c4-63bd-452d-8b0b-e7eaa9a61bc8',
      rowId: 96,
      props: {
        index: 'header_0',
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total',
          },
        },
        style: getStyle(cycle),
      },
    },
    ...getCols(cycle, cols),
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
    readonly: false,
    variableName: 'carbonStockTotal',

    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground + ${TableNames.carbonStock}.carbon_forest_deadwood + ${TableNames.carbonStock}.carbon_forest_litter + ${TableNames.carbonStock}.carbon_forest_soil`,
    },
  },
} as Row

const rows = [headerRow, rowTotalGrowingStock, rowCarbonStockInBiomass, rowCarbonStockTotal]

const table = {
  id: -1, // 13,
  uuid: undefined, // '6998ad30-6792-4751-b74b-3637afeb5aa1',
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
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7'],
    dataExport: false,
    columnNames: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': cols,
    },
  },
  rows,
} as Table

export const forestGrowingStockAndCarbonDashboard2020: DashboardTable = {
  type: DashboardItemType.table,
  title: { key: 'statisticalFactsheets.carbonAndGrowingStock.title' },
  table,
}
