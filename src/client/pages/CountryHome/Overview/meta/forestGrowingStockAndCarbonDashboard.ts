// Forest growing stock and carbon
import { Table, TableNames } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2020',
        colType: 'header',
      },
    },
    {
      id: 481,
      uuid: '89138f73-6b5c-4ba2-9301-2256531a88ca',
      rowId: 89,
      props: {
        index: 5,
        cycles: ['66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2025',
        colType: 'header',
        style: {
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
  ],
  uuid: '137523ed-1ddf-476f-a0e9-4fa8d04eab38',
  tableId: 13,
  props: {
    type: 'header',
    index: 'header_1',
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total',
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.growing_stock_total',
          },
        },
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
          },
        },
      },
    },
    {
      id: 549,
      uuid: '41d386ce-d511-4bd1-b3f3-7154009bea2c',
      rowId: 96,
      props: {
        index: 0,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '1990',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 550,
      uuid: '2a5d663f-037a-457c-b47f-6f11ce2d6a1f',
      rowId: 96,
      props: {
        index: 1,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2000',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 551,
      uuid: '74afdd13-074c-4c31-ae67-be3fb2d6876f',
      rowId: 96,
      props: {
        index: 2,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2010',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 557,
      uuid: '8db60f01-f5b7-4489-9b4f-53aba41bf41c',
      rowId: 96,
      props: {
        index: 8,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2020',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 558,
      uuid: '39208cf4-e815-415e-b7cb-b6faaa68ee39',
      rowId: 96,
      props: {
        index: 9,
        cycles: ['66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2025',
        colType: 'decimal',
        style: {
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
    readonly: false,
    variableName: 'forest',
    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': 'growingStockTotal.forest',
      '66da2217-da42-492f-9ff4-c99a59e6675c': 'growingStockTotal.forest',
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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total',
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_biomass_total',
          },
        },
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
          },
        },
      },
    },
    {
      id: 549,
      uuid: '41d386ce-d511-4bd1-b3f3-7154009bea2c',
      rowId: 96,
      props: {
        index: 0,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '1990',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 550,
      uuid: '2a5d663f-037a-457c-b47f-6f11ce2d6a1f',
      rowId: 96,
      props: {
        index: 1,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2000',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 551,
      uuid: '74afdd13-074c-4c31-ae67-be3fb2d6876f',
      rowId: 96,
      props: {
        index: 2,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2010',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 557,
      uuid: '8db60f01-f5b7-4489-9b4f-53aba41bf41c',
      rowId: 96,
      props: {
        index: 8,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2020',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 558,
      uuid: '39208cf4-e815-415e-b7cb-b6faaa68ee39',
      rowId: 96,
      props: {
        index: 9,
        cycles: ['66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2025',
        colType: 'decimal',
        style: {
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
    readonly: false,
    variableName: 'carbonStockBiomassTotal',
    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground `,
      '66da2217-da42-492f-9ff4-c99a59e6675c': `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground `,
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
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colType: 'header',
        // TODO: Move translation and add unit. eg unit.{millionsCubicMeterOverBark,tonnesPerHa} as param
        labels: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total',
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            key: 'statisticalFactsheets.carbonAndGrowingStock.carbon_stock_total',
          },
        },
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
          },
        },
      },
    },
    {
      id: 549,
      uuid: '41d386ce-d511-4bd1-b3f3-7154009bea2c',
      rowId: 96,
      props: {
        index: 0,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '1990',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 550,
      uuid: '2a5d663f-037a-457c-b47f-6f11ce2d6a1f',
      rowId: 96,
      props: {
        index: 1,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2000',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 551,
      uuid: '74afdd13-074c-4c31-ae67-be3fb2d6876f',
      rowId: 96,
      props: {
        index: 2,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2010',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 557,
      uuid: '8db60f01-f5b7-4489-9b4f-53aba41bf41c',
      rowId: 96,
      props: {
        index: 8,
        cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2020',
        colType: 'decimal',
        style: {
          '66817a08-dc93-4151-b5ed-176d8f04e9b7': {
            colSpan: 1,
            rowSpan: 1,
          },
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
    {
      id: 558,
      uuid: '39208cf4-e815-415e-b7cb-b6faaa68ee39',
      rowId: 96,
      props: {
        index: 9,
        cycles: ['66da2217-da42-492f-9ff4-c99a59e6675c'],
        colName: '2025',
        colType: 'decimal',
        style: {
          '66da2217-da42-492f-9ff4-c99a59e6675c': {
            colSpan: 1,
            rowSpan: 1,
          },
        },
      },
    },
  ],
  uuid: '2fae3553-15fd-4f81-a575-32a54c30ebe9',
  tableId: 13,
  props: {
    type: 'data',
    index: 6,
    label: {
      key: 'growingStock.forest',
    },
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
    readonly: false,
    variableName: 'carbonStockTotal',

    calculateFn: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': `${TableNames.carbonStock}.carbon_forest_above_ground + ${TableNames.carbonStock}.carbon_forest_below_ground + ${TableNames.carbonStock}.carbon_forest_deadwood + ${TableNames.carbonStock}.carbon_forest_litter + ${TableNames.carbonStock}.carbon_forest_soil`,
      '66da2217-da42-492f-9ff4-c99a59e6675c': `${TableNames.carbonStockAvg}.carbon_forest_above_ground + ${TableNames.carbonStockAvg}.carbon_forest_below_ground + ${TableNames.carbonStockAvg}.carbon_forest_deadwood + ${TableNames.carbonStockAvg}.carbon_forest_litter + ${TableNames.carbonStockAvg}.carbon_forest_soil`,
    },
  },
}

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
      // TODO? : Record<cycleUuid, Array<VariableCache>> or addDependencies -> filter by cycleName
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_below_ground',
      //   cycleName: '2020',
      // },
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_above_ground',
      //   cycleName: '2020',
      // },

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
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_above_ground',
      //   cycleName: '2020',
      // },
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_below_ground',
      //   cycleName: '2020',
      // },
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_deadwood',
      //   cycleName: '2020',
      // },
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_litter',
      //   cycleName: '2020',
      // },
      // {
      //   tableName: TableNames.carbonStock,
      //   variableName: 'carbon_forest_soil',
      //   cycleName: '2020',
      // },

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
    cycles: ['66817a08-dc93-4151-b5ed-176d8f04e9b7', '66da2217-da42-492f-9ff4-c99a59e6675c'],
    dataExport: true,
    columnNames: {
      '66817a08-dc93-4151-b5ed-176d8f04e9b7': ['1990', '2000', '2010', '2015', '2020'],
      '66da2217-da42-492f-9ff4-c99a59e6675c': ['1990', '2000', '2010', '2015', '2020', '2025'],
    },
  },
  rows,
} as Table

export const forestGrowingStockAndCarbonDashboard: DashboardTable = {
  type: DashboardItemType.table,
  title: { key: 'statisticalFactsheets.carbonAndGrowingStock.title' },
  table,
}
