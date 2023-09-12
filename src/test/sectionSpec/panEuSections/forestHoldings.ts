// @ts-nocheck

import { updatedDataCol } from '../panEuHelpers/updatedDataCol'

const dataColsPublic2005 = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_1a.forest_yearPlaceholder['area'],
                  [table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area']],
                   "panEuropean.forestHoldings.forest", "panEuropean.forestArea.area1000Ha", "1.1a", 
                   ["panEuropean.forestHoldings.public_ownership", 
                   "panEuropean.forestHoldings.private_ownership", 
                   "panEuropean.forestHoldings.other"])`,
        ],
      },
    },
  },
  { idx: 1, type: 'integer' },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_public_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_public_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 4,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_public_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_public_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_public_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 7,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_public_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_public_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_public_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_public_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
]
const dataColsPublic = [
  {
    ...dataColsPublic2005[0],
    migration: {
      ...dataColsPublic2005[0].migration,
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestOwnership',
          variableName: 'private_ownership',
          colName: '2020',
        },
      },
    },
  },
  ...dataColsPublic2005.slice(1),
]
const dataColsPrivate2005 = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_1a.forest_yearPlaceholder['area'],
                  [table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area']],
                   "panEuropean.forestHoldings.forest", "panEuropean.forestArea.area1000Ha", "1.1a", 
                   ["panEuropean.forestHoldings.public_ownership", 
                   "panEuropean.forestHoldings.private_ownership", 
                   "panEuropean.forestHoldings.other"])`,
        ],
      },
    },
  },
  { idx: 1, type: 'integer' },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_private_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_private_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 4,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_private_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_private_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.in_private_ownership_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 7,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.in_private_ownership_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.in_private_ownership_yearPlaceholder['less_10_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.in_private_ownership_yearPlaceholder['more_500_ha_number']],
                     "6_1.in_private_ownership_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
]
const dataColsPrivate = [
  {
    ...dataColsPrivate2005[0],
    migration: {
      ...dataColsPrivate2005[0].migration,
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestOwnership',
          variableName: 'private_ownership',
          colName: '2020',
        },
      },
    },
  },
  ...dataColsPrivate2005.slice(1),
]

const dataColsOther = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_1a.forest_yearPlaceholder['area'],
                  [table_6_1.in_private_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.in_public_ownership_yearPlaceholder['total_forest_area'],
                   table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area']],
                   "panEuropean.forestHoldings.forest", "panEuropean.forestArea.area1000Ha", "1.1a", 
                   ["panEuropean.forestHoldings.public_ownership", 
                   "panEuropean.forestHoldings.private_ownership", 
                   "panEuropean.forestHoldings.other"])`,
        ],
      },
    },
  },
  { idx: 1, type: 'integer' },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.other_types_of_ownership_unknown_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_number']],
                     "6_1.other_types_of_ownership_unknown_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 4,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.other_types_of_ownership_unknown_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_number']],
                     "6_1.other_types_of_ownership_unknown_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_forest_area'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_area'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_area']],
                     "table_6_1.other_types_of_ownership_unknown_yearPlaceholder[total_forest_area]")`,
        ],
      },
    },
  },
  {
    idx: 7,
    type: 'integer',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_6_1.other_types_of_ownership_unknown_yearPlaceholder['total_number_of_holdings'],
                     [table_6_1.other_types_of_ownership_unknown_yearPlaceholder['less_10_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['_11_500_ha_number'],
                     table_6_1.other_types_of_ownership_unknown_yearPlaceholder['more_500_ha_number']],
                     "6_1.other_types_of_ownership_unknown_yearPlaceholder[total_number_of_holdings]")`,
        ],
      },
    },
  },
]

export const forestHoldings = {
  sectionName: 'forestHoldings',
  sectionAnchor: '6.1',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.forestHoldings.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.forestHoldings.total_forest_area',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.forestHoldings.total_number_of_holdings',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 6,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.areaAndNumberOfForestHoldingsInSizeClasses',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.less10ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings._11_500ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.more500ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.area1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.area1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.area1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic, '2020', 'public_ownership'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 2020 },
              variableExport: 'in_public_ownership_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic, '2015', 'public_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 2015 },
              variableExport: 'in_public_ownership_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic, '2010', 'public_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 2010 },
              variableExport: 'in_public_ownership_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic2005, '2005', 'public_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 2005 },
              variableExport: 'in_public_ownership_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic, '2000', 'public_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 2000 },
              variableExport: 'in_public_ownership_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_public_ownership',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPublic, '1990', 'public_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_public_ownership',
              labelParams: { year: 1990 },
              variableExport: 'in_public_ownership_1990',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate, '2020', 'private_ownership'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 2020 },
              variableExport: 'in_private_ownership_2020',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate, '2015', 'private_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 2015 },
              variableExport: 'in_private_ownership_2015',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate, '2010', 'private_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 2010 },
              variableExport: 'in_private_ownership_2010',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate2005, '2005', 'private_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 2005 },
              variableExport: 'in_private_ownership_2005',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate, '2000', 'private_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 2000 },
              variableExport: 'in_private_ownership_2000',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.in_private_ownership',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsPrivate, '1990', 'private_ownership'),
              ],
              labelKey: 'panEuropean.forestHoldings.in_private_ownership',
              labelParams: { year: 1990 },
              variableExport: 'in_private_ownership_1990',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '2020'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 2020 },
              variableExport: 'other_types_of_ownership_unknown_2020',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '2015'),
              ],
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 2015 },
              variableExport: 'other_types_of_ownership_unknown_2015',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '2010'),
              ],
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 2010 },
              variableExport: 'other_types_of_ownership_unknown_2010',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '2005'),
              ],
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 2005 },
              variableExport: 'other_types_of_ownership_unknown_2005',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '2000'),
              ],
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 2000 },
              variableExport: 'other_types_of_ownership_unknown_2000',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(dataColsOther, '1990'),
              ],
              labelKey: 'panEuropean.forestHoldings.other_types_of_ownership_unknown',
              labelParams: { year: 1990 },
              variableExport: 'other_types_of_ownership_unknown_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [
            'total_forest_area',
            'total_number_of_holdings',
            'less_10_ha_area',
            'less_10_ha_number',
            '_11_500_ha_area',
            '_11_500_ha_number',
            'more_500_ha_area',
            'more_500_ha_number',
          ],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_6_1_1',
          rows: [
            {
              idx: 'header_0',
              variableName: 'minimumSizeOfForestHoldingReportedHa',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.minimumSizeOfForestHoldingReportedHa',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
              type: 'data',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment'] },
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_6_1_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.category',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsRelatedToDataDefinitions',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsOnTrend',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'generalComments',
              'areaAndNumberOfHoldingsInPublicOwnership',
              'areaAndNumberOfHoldingsInPrivateOwnership',
            ].map((variableName, idx) => ({
              idx,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
                { idx: 1, type: 'textarea', colName: 'comment_trends' },
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment', 'comment_trends'] },
          },
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: true,
    comments: true,
    introductoryText: false,
    nationalData: true,
  },
  dataExport: {
    included: true,
  },
}
