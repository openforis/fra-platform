// @ts-nocheck

const dataColsATotalAndOtherWoodedLand = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2025['total'],
                         [table_1_2a.forest_2025['total'], table_1_2a.other_wooded_land_2025['total']],
                         "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
        ],
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2025['coniferous'],
                         [table_1_2a.forest_2025['coniferous'], table_1_2a.other_wooded_land_2025['coniferous']],
                         "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.coniferous", "1.2.I")`,
        ],
      },
    },
  },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2025['broadleaved'],
                        [table_1_2a.forest_2025['broadleaved'], table_1_2a.other_wooded_land_2025['broadleaved']],
                        "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.broadleaved", "1.2.I")`,
        ],
      },
    },
  },
]

const updatedDataColsA = (year: string) =>
  dataColsATotalAndOtherWoodedLand.map((col) => {
    if (col.migration && col.migration.validateFns && col.migration.validateFns['2025']) {
      const validateFns = {
        ...col.migration.validateFns,
        '2025': col.migration.validateFns['2025'].map((fn: string) => fn.replace(/2025/g, year)),
      }

      return {
        ...col,
        migration: {
          ...col.migration,
          validateFns,
        },
      }
    }
    return col
  })

//
const dataColsB = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_1990['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_1990'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_1990'],
                  table_1_2b.mixed_forest['growing_stock_1990']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2000['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2000'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2000'],
                  table_1_2b.mixed_forest['growing_stock_2000']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2005['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2005'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2005'],
                  table_1_2b.mixed_forest['growing_stock_2005']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2010['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2010'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2010'],
                  table_1_2b.mixed_forest['growing_stock_2010']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
          `validatorEqualToSum(table_1_2a.forest_2015['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2015'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2015'],
                  table_1_2b.mixed_forest['growing_stock_2015']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2020['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2020'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2020'],
                  table_1_2b.mixed_forest['growing_stock_2020']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    colName: 'growing_stock_2025',
    migration: {
      cycles: ['2025'],
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2025['total'],
                  [table_1_2b.predominantly_coniferous_forest['growing_stock_2025'],
                  table_1_2b.predominantly_broadleaved_forest['growing_stock_2025'],
                  table_1_2b.mixed_forest['growing_stock_2025']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
        ],
      },
    },
  },
]
const dataColsC = [
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_1990['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_1990']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2000['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2000']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
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
          `validatorEqualToSum(table_1_2a.forest_2005['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2005']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2010['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2010']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
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
          `validatorEqualToSum(table_1_2a.forest_2015['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2015']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
        ],
      },
    },
  },
  {
    idx: 7,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2020['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2020']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
        ],
      },
    },
  },
  {
    idx: 8,
    type: 'decimal',
    colName: 'growing_stock_in_forest_2025',
    migration: {
      cycles: ['2025'],
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_2a.forest_2025['total'],
                  [table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2025']],
                  "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I",
                   ["panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume",
                  "...",
                  "panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume"])`,
        ],
      },
    },
  },
]

export const growingStock = {
  sectionName: 'growingStock',
  sectionAnchor: '1.2a',
  tableSections: [
    {
      titleKey: 'panEuropean.growingStock.growingStockNumber',
      tableSpecs: [
        {
          name: 'table_1_2a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.growingStock.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStock.growingStockMillionM3OB',
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
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.growingStock.total',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStock._ofWhich',
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
                  labelKey: 'panEuropean.growingStock.coniferous',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStock.broadleaved',
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
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '2025',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal', variableExport: 'pan_european_growing_stock_coniferus_2025' },
                { idx: 2, type: 'decimal', variableExport: 'pan_european_growing_stock_broadleaved_2025' },
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2025['total'],
                    [table_1_2a.forest_2025['coniferous'],table_1_2a.forest_2025['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2025 },
              variableName: 'forest_2025',
              variableExport: 'forest_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '2020',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal', variableExport: 'pan_european_growing_stock_coniferus_2020' },
                { idx: 2, type: 'decimal', variableExport: 'pan_european_growing_stock_broadleaved_2020' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2020['total'],
                    [table_1_2a.forest_2020['coniferous'],table_1_2a.forest_2020['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '2015',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2015['total'],
                    [table_1_2a.forest_2015['coniferous'],table_1_2a.forest_2015['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '2010',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2010['total'],
                    [table_1_2a.forest_2010['coniferous'],table_1_2a.forest_2010['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2005['total'],
                    [table_1_2a.forest_2005['coniferous'],table_1_2a.forest_2005['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '2000',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_2000['total'],
                    [table_1_2a.forest_2000['coniferous'],table_1_2a.forest_2000['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'forest',
                        colName: '1990',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.forest_1990['total'],
                    [table_1_2a.forest_1990['coniferous'],table_1_2a.forest_1990['broadleaved']],
                    "panEuropean.growingStock.forest", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2025['total'],[table_1_2a._of_which_available_for_wood_supply_2025['coniferous'],table_1_2a._of_which_available_for_wood_supply_2025['broadleaved']], 
                    "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2025 },
              variableExport: '_of_which_available_for_wood_supply_2025',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2020['total'],
                  [table_1_2a._of_which_available_for_wood_supply_2020['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_2020['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2020 },
              variableExport: '_of_which_available_for_wood_supply_2020',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2015['total'],
                  [table_1_2a._of_which_available_for_wood_supply_2015['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_2015['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2015 },
              variableExport: '_of_which_available_for_wood_supply_2015',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2010['total'],
                  [table_1_2a._of_which_available_for_wood_supply_2010['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_2010['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2010 },
              variableExport: '_of_which_available_for_wood_supply_2010',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2005['total'],
                  [table_1_2a._of_which_available_for_wood_supply_2005['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_2005['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2005 },
              variableExport: '_of_which_available_for_wood_supply_2005',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_2000['total'],
                  [table_1_2a._of_which_available_for_wood_supply_2000['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_2000['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 2000 },
              variableExport: '_of_which_available_for_wood_supply_2000',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_1990['total'],
                  [table_1_2a._of_which_available_for_wood_supply_1990['coniferous'],
                  table_1_2a._of_which_available_for_wood_supply_1990['broadleaved']],
                  "panEuropean.growingStock._of_which_available_for_wood_supply", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock._of_which_available_for_wood_supply',
              labelParams: { year: 1990 },
              variableExport: '_of_which_available_for_wood_supply_1990',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '2025',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2025['total'],[table_1_2a.other_wooded_land_2025['coniferous'],table_1_2a.other_wooded_land_2025['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'other_wooded_land_2025',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '2020',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2020['total'],[table_1_2a.other_wooded_land_2020['coniferous'],table_1_2a.other_wooded_land_2020['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '2015',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2015['total'],[table_1_2a.other_wooded_land_2015['coniferous'],table_1_2a.other_wooded_land_2015['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '2010',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2010['total'],[table_1_2a.other_wooded_land_2010['coniferous'],table_1_2a.other_wooded_land_2010['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2005['total'],[table_1_2a.other_wooded_land_2005['coniferous'],table_1_2a.other_wooded_land_2005['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '2000',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_2000['total'],[table_1_2a.other_wooded_land_2000['coniferous'],table_1_2a.other_wooded_land_2000['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'growingStockTotal',
                        variableName: 'otherWoodedLand',
                        colName: '1990',
                      },
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.other_wooded_land_1990['total'],[table_1_2a.other_wooded_land_1990['coniferous'],table_1_2a.other_wooded_land_1990['broadleaved']],
                    "panEuropean.growingStock.other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2025'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2025['total'],
                          [table_1_2a.total_forest_and_other_wooded_land_2025['coniferous'],
                          table_1_2a.total_forest_and_other_wooded_land_2025['broadleaved']],
                          "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'total_forest_and_other_wooded_land_2025',
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2020'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2020['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_2020['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_2020['broadleaved']],
                  "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 23,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2015['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_2015['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_2015['broadleaved']],
                  "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 24,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2010['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_2010['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_2010['broadleaved']],
                   "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 25,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2005['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_2005['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_2005['broadleaved']],
                    "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 26,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_2000['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_2000['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_2000['broadleaved']],
                  "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 27,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsA('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_1990['total'],
                  [table_1_2a.total_forest_and_other_wooded_land_1990['coniferous'],
                  table_1_2a.total_forest_and_other_wooded_land_1990['broadleaved']],
                   "panEuropean.growingStock.total_forest_and_other_wooded_land", "panEuropean.growingStock.total", "1.2.I")`,
                  ],
                },
              },
              labelKey: 'panEuropean.growingStock.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionsCubicMeterOverBark',
          columnsExport: ['total', 'coniferous', 'broadleaved'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.growingStock.growingStockByForestTypeNumber',
      tableSpecs: [
        {
          name: 'table_1_2b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.growingStockByForestType.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.growingStockByForestType.growingStockMillionM3OB',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.growingStockByForestType.predominantly_coniferous_forest',
                  className: 'fra-table__category-cell',
                },
                ...dataColsB,
              ],
              variableExport: 'predominantly_coniferous_forest',
              labelKey: 'panEuropean.growingStockByForestType.predominantly_coniferous_forest',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockByForestType.predominantly_broadleaved_forest',
                  className: 'fra-table__category-cell',
                },
                ...dataColsB,
              ],
              variableExport: 'predominantly_broadleaved_forest',
              labelKey: 'panEuropean.growingStockByForestType.predominantly_broadleaved_forest',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockByForestType.mixed_forest',
                  className: 'fra-table__category-cell',
                },
                ...dataColsB,
              ],
              variableExport: 'mixed_forest',
              labelKey: 'panEuropean.growingStockByForestType.mixed_forest',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionsCubicMeterOverBark',
          columnsExport: [
            'growing_stock_1990',
            'growing_stock_2000',
            'growing_stock_2005',
            'growing_stock_2010',
            'growing_stock_2015',
            'growing_stock_2020',
          ],
          migration: {
            cycles: ['2025'],
            columnNames: {
              '2020': [
                'growing_stock_1990',
                'growing_stock_2000',
                'growing_stock_2005',
                'growing_stock_2010',
                'growing_stock_2015',
                'growing_stock_2020',
              ],
              '2025': [
                'growing_stock_1990',
                'growing_stock_2000',
                'growing_stock_2005',
                'growing_stock_2010',
                'growing_stock_2015',
                'growing_stock_2020',
                'growing_stock_2025',
              ],
            },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.growingStock.growingStockCompositionNumber',
      tableSpecs: [
        {
          name: 'table_1_2c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.speciesName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.growingStockComposition.growingStockInForestMillionM3OB',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.rank',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.scientificName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.commonName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 9,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                },
                {
                  idx: 1,
                  type: 'text',
                },
                ...dataColsC,
              ],
              variableExport: 'no1_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no2_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no2_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no2_ranked_in_terms_of_volume',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no3_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no3_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no3_ranked_in_terms_of_volume',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no4_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no4_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no4_ranked_in_terms_of_volume',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no5_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no5_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no5_ranked_in_terms_of_volume',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no6_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no6_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no6_ranked_in_terms_of_volume',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no7_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no7_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no7_ranked_in_terms_of_volume',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no8_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no8_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no8_ranked_in_terms_of_volume',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no9_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no9_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no9_ranked_in_terms_of_volume',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                ...dataColsC,
              ],
              variableExport: 'no10_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'panEuropean.growingStockComposition.remaining',
                  className: 'fra-table__category-cell',
                },
                { idx: 2, type: 'decimal' },
                { idx: 3, type: 'decimal' },
                {
                  idx: 4,
                  type: 'decimal',
                },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal' },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              labelKey: 'panEuropean.growingStockComposition.remaining',
              variableExport: 'remaining',
              colSpan: 3,
              migration: {
                colNames: [
                  'growing_stock_in_forest_1990',
                  'growing_stock_in_forest_2000',
                  'growing_stock_in_forest_2005',
                  'growing_stock_in_forest_2010',
                  'growing_stock_in_forest_2015',
                  'growing_stock_in_forest_2020',
                ],
              },
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'panEuropean.growingStockComposition.total',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_1990'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_1990'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_1990']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2000'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2000'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2000']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2005'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2005'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2005']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2010'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2010'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2010']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2015'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2015'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2015']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2020'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2020'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2020']])`,
                    `validatorEqualToSum(table_1_2c.total['growing_stock_in_forest_2025'],
                  [table_1_2c.no1_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no2_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no3_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no4_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no5_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no6_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no7_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no8_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],
                  table_1_2c.no9_ranked_in_terms_of_volume['growing_stock_in_forest_2025'],table_1_2c.no10_ranked_in_terms_of_volume['growing_stock_in_forest_2025']])`,
                  ],
                },
                colNames: [
                  'growing_stock_in_forest_1990',
                  'growing_stock_in_forest_2000',
                  'growing_stock_in_forest_2005',
                  'growing_stock_in_forest_2010',
                  'growing_stock_in_forest_2015',
                  'growing_stock_in_forest_2020',
                ],
              },
              labelKey: 'panEuropean.growingStockComposition.total',
              variableExport: 'total',
              colSpan: 3,
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [
            'scientific_name',
            'common_name',
            'growing_stock_in_forest_1990',
            'growing_stock_in_forest_2000',
            'growing_stock_in_forest_2005',
            'growing_stock_in_forest_2010',
            'growing_stock_in_forest_2015',
            'growing_stock_in_forest_2020',
          ],
          migration: {
            cycles: ['2025'],
            columnNames: {
              '2020': [
                'scientific_name',
                'common_name',
                'growing_stock_in_forest_1990',
                'growing_stock_in_forest_2000',
                'growing_stock_in_forest_2005',
                'growing_stock_in_forest_2010',
                'growing_stock_in_forest_2015',
                'growing_stock_in_forest_2020',
              ],
              '2025': [
                'scientific_name',
                'common_name',
                'growing_stock_in_forest_1990',
                'growing_stock_in_forest_2000',
                'growing_stock_in_forest_2005',
                'growing_stock_in_forest_2010',
                'growing_stock_in_forest_2015',
                'growing_stock_in_forest_2020',
                'growing_stock_in_forest_2025',
              ],
            },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.reasonabilityChecks.reasonabilityCheck',
      descriptionKey: 'panEuropean.reasonabilityChecks.description',
      tableSpecs: [
        {
          name: 'reasonability_check_1_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.variable',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.forest',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.FAWS',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.OWL',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.FOWL',
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
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_2020.total * 1000) / table_1_1a.forest_2020.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_2020.total * 1000) / table_1_1a._of_which_available_for_wood_supply_2020.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_2020.total * 1000) / table_1_1a.other_wooded_land_2020.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_2020.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_2020.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 2020 },
              variableExport: 'growingStockPerHa_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_2015.total * 1000) / table_1_1a.forest_2015.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_2015.total * 1000) / table_1_1a._of_which_available_for_wood_supply_2015.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_2015.total * 1000) / table_1_1a.other_wooded_land_2015.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_2015.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_2015.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 2015 },
              variableExport: 'growingStockPerHa_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_2010.total * 1000) / table_1_1a.forest_2010.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_2010.total * 1000) / table_1_1a._of_which_available_for_wood_supply_2010.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_2010.total * 1000) / table_1_1a.other_wooded_land_2010.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_2010.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_2010.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 2010 },
              variableExport: 'growingStockPerHa_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_2005.total * 1000) / table_1_1a.forest_2005.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_2005.total * 1000) / table_1_1a._of_which_available_for_wood_supply_2005.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_2005.total * 1000) / table_1_1a.other_wooded_land_2005.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_2005.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_2005.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 2005 },
              variableExport: 'growingStockPerHa_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_2000.total * 1000) / table_1_1a.forest_2000.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_2000.total * 1000) / table_1_1a._of_which_available_for_wood_supply_2000.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_2000.total * 1000) / table_1_1a.other_wooded_land_2000.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_2000.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_2000.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 2000 },
              variableExport: 'growingStockPerHa_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: '(table_1_2a.forest_1990.total * 1000) / table_1_1a.forest_1990.area',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: 'FAWS',
                  migration: {
                    calculateFn:
                      '(table_1_2a._of_which_available_for_wood_supply_1990.total * 1000) / table_1_1a._of_which_available_for_wood_supply_1990.area',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.other_wooded_land_1990.total * 1000) / table_1_1a.other_wooded_land_1990.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      '(table_1_2a.total_forest_and_other_wooded_land_1990.total * 1000) / table_1_1a.total_forest_and_other_wooded_land_1990.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.growingStockPerHa',
              labelParams: { year: 1990 },
              variableExport: 'growingStockPerHa_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['variable', 'forest', 'FAWS', 'OWL', 'FOWL'] },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_1_2_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.theYearAndDataReported',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'theRecentAvailableYear',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.countryComments.howDidYouGenerateValues',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: -1,
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.theRecentAvailableYear',
                  className: 'fra-table__header-cell',
                  type: 'placeholder',
                },
                { idx: 1, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'extrapolation',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.extrapolation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 2,
              type: 'data',
              variableName: 'assessmentBasedOnEvidence',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.assessmentBasedOnEvidence',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
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
          name: 'country_comments_1_2_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachToReportingOnGrowingStock',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'valuesAccordingFaoDefinitionGrowingStock',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  labelKey: 'panEuropean.countryComments.valuesAccordingFaoDefinitionGrowingStock',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 1, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'minimumDiameter',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 4,
                  labelKey: 'panEuropean.countryComments.ifNotPleaseSpecifyRelevantThresholds',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: -1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.minimumDiameter',
                  className: 'fra-table__header-cell',
                  type: 'placeholder',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 2,
              type: 'data',
              variableName: 'minimumTopDiameterUsed',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.minimumTopDiameterUsed',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 3,
              type: 'data',
              variableName: 'minimumBranchDiameterUsed',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.minimumBranchDiameterUsed',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 4,
              type: 'data',
              variableName: 'isVolumeAboveGroundOrAboveStump',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.isVolumeAboveGroundOrAboveStump',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
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
          name: 'country_comments_1_2_3',
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
              'growingStockOnForestArea',
              'ofWhichAvailableForWoodSupply',
              'growingStockOnOwl',
              'growingStockOnFowls',
              'forestTypes',
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
    linkedVariables: [
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'growingStock',
        tableName: 'growingStock',
        variableName: 'forest',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'growingStock',
        tableName: 'growingStock',
        variableName: 'otherWoodedLand',
      },
    ],
  },
  dataExport: {
    included: true,
  },
  migration: {
    anchors: {
      '2020': '1.2a',
      '2025': '1.2',
    },
  },
}
export const growingStockByForestType = {
  sectionName: 'growingStockByForestType',
  sectionAnchor: '1.2b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_2b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.growingStockByForestType.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.growingStockByForestType.growingStockMillionM3OB',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.growingStockByForestType.predominantly_coniferous_forest',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'predominantly_coniferous_forest',
              labelKey: 'panEuropean.growingStockByForestType.predominantly_coniferous_forest',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockByForestType.predominantly_broadleaved_forest',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'predominantly_broadleaved_forest',
              labelKey: 'panEuropean.growingStockByForestType.predominantly_broadleaved_forest',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockByForestType.mixed_forest',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'mixed_forest',
              labelKey: 'panEuropean.growingStockByForestType.mixed_forest',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionsCubicMeterOverBark',
          columnsExport: [
            'growing_stock_1990',
            'growing_stock_2000',
            'growing_stock_2005',
            'growing_stock_2010',
            'growing_stock_2015',
            'growing_stock_2020',
          ],
          migration: {
            columnNames: {
              '2020': [
                'growing_stock_1990',
                'growing_stock_2000',
                'growing_stock_2005',
                'growing_stock_2010',
                'growing_stock_2015',
                'growing_stock_2020',
              ],
              '2025': [
                'growing_stock_1990',
                'growing_stock_2000',
                'growing_stock_2005',
                'growing_stock_2010',
                'growing_stock_2015',
                'growing_stock_2020',
                'growing_stock_2025',
              ],
            },
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
  migration: {
    cycles: ['2020'],
  },
}
export const growingStockComposition = {
  sectionName: 'growingStockComposition',
  sectionAnchor: '1.2c',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_2c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.speciesName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.growingStockComposition.growingStockInForestMillionM3OB',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.rank',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.scientificName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.commonName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 9,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no1_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no1_ranked_in_terms_of_volume',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no2_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no2_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no2_ranked_in_terms_of_volume',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no3_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no3_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no3_ranked_in_terms_of_volume',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no4_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no4_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no4_ranked_in_terms_of_volume',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no5_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no5_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no5_ranked_in_terms_of_volume',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no6_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no6_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no6_ranked_in_terms_of_volume',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no7_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no7_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no7_ranked_in_terms_of_volume',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no8_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no8_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no8_ranked_in_terms_of_volume',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no9_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no9_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no9_ranked_in_terms_of_volume',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'decimal',
                },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                {
                  idx: 6,
                  type: 'decimal',
                },
                { idx: 7, type: 'decimal' },
                { idx: 8, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'no10_ranked_in_terms_of_volume',
              labelKey: 'panEuropean.growingStockComposition.no10_ranked_in_terms_of_volume',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'panEuropean.growingStockComposition.remaining',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal', colName: 'growing_stock_in_forest_1990' },
                { idx: 1, type: 'decimal', colName: 'growing_stock_in_forest_2000' },
                { idx: 2, type: 'decimal', colName: 'growing_stock_in_forest_2005' },
                { idx: 3, type: 'decimal', colName: 'growing_stock_in_forest_2010' },
                { idx: 4, type: 'decimal', colName: 'growing_stock_in_forest_2015' },
                { idx: 5, type: 'decimal', colName: 'growing_stock_in_forest_2020' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              labelKey: 'panEuropean.growingStockComposition.remaining',
              variableExport: 'remaining',
              variableName: 'remaining',
              migration: {
                colNames: [
                  'growing_stock_in_forest_1990',
                  'growing_stock_in_forest_2000',
                  'growing_stock_in_forest_2005',
                  'growing_stock_in_forest_2010',
                  'growing_stock_in_forest_2015',
                  'growing_stock_in_forest_2020',
                ],
              },
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'panEuropean.growingStockComposition.total',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal', colName: 'growing_stock_in_forest_1990' },
                { idx: 1, type: 'decimal', colName: 'growing_stock_in_forest_2000' },
                { idx: 2, type: 'decimal', colName: 'growing_stock_in_forest_2005' },
                { idx: 3, type: 'decimal', colName: 'growing_stock_in_forest_2010' },
                { idx: 4, type: 'decimal', colName: 'growing_stock_in_forest_2015' },
                { idx: 5, type: 'decimal', colName: 'growing_stock_in_forest_2020' },
                { idx: 6, type: 'decimal', colName: 'growing_stock_in_forest_2025', migration: { cycles: ['2025'] } },
              ],
              labelKey: 'panEuropean.growingStockComposition.total',
              variableExport: 'total',
              migration: {
                colNames: [
                  'growing_stock_in_forest_1990',
                  'growing_stock_in_forest_2000',
                  'growing_stock_in_forest_2005',
                  'growing_stock_in_forest_2010',
                  'growing_stock_in_forest_2015',
                  'growing_stock_in_forest_2020',
                ],
              },
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [
            'scientific_name',
            'common_name',
            'growing_stock_in_forest_1990',
            'growing_stock_in_forest_2000',
            'growing_stock_in_forest_2005',
            'growing_stock_in_forest_2010',
            'growing_stock_in_forest_2015',
            'growing_stock_in_forest_2020',
          ],
          migration: {
            columnNames: {
              '2020': [
                'scientific_name',
                'common_name',
                'growing_stock_in_forest_1990',
                'growing_stock_in_forest_2000',
                'growing_stock_in_forest_2005',
                'growing_stock_in_forest_2010',
                'growing_stock_in_forest_2015',
                'growing_stock_in_forest_2020',
              ],
              '2025': [
                'scientific_name',
                'common_name',
                'growing_stock_in_forest_1990',
                'growing_stock_in_forest_2000',
                'growing_stock_in_forest_2005',
                'growing_stock_in_forest_2010',
                'growing_stock_in_forest_2015',
                'growing_stock_in_forest_2020',
                'growing_stock_in_forest_2025',
              ],
            },
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
  migration: {
    cycles: ['2020'],
  },
}
