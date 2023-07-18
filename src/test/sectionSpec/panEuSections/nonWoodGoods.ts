// @ts-nocheck

const dataCols = [
  {
    idx: 0,
    type: 'text',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'product_name',
        },
      },
    },
  },
  {
    idx: 1,
    type: 'text',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'key_species',
        },
      },
    },
  },
  {
    idx: 2,
    type: 'text',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'unit',
        },
      },
    },
  },
  {
    idx: 3,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'quantity',
        },
      },
    },
  },
  {
    idx: 4,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'value',
        },
      },
    },
  },
  {
    idx: 5,
    type: 'text',
    migration: {
      cycles: ['2020'],
    },
  },
  {
    idx: 6,
    type: 'select',
    options: [
      {
        optionName: 'plantProductsSelectHeading',
        type: 'header',
      },
      {
        optionName: 'food',
      },
      {
        optionName: 'fodder',
      },
      {
        optionName: 'rawMaterialForMedicine',
      },
      {
        optionName: 'rawMaterialForColorants',
      },
      {
        optionName: 'rawMaterialForUtensils',
      },
      {
        optionName: 'ornamentalPlants',
      },
      {
        optionName: 'exudates',
      },
      {
        optionName: 'otherPlantProducts',
      },
      {
        optionName: 'animalProductsSelectHeading',
        type: 'header',
      },
      {
        optionName: 'livingAnimals',
      },
      {
        optionName: 'hidesSkins',
      },
      {
        optionName: 'wildHoney',
      },
      {
        optionName: 'wildMeat',
      },
      {
        optionName: 'animalRawMaterialForMedicine',
      },
      {
        optionName: 'animalRawMaterialForColorants',
      },
      {
        optionName: 'otherEdibleAnimalProducts',
      },
      {
        optionName: 'otherNonEdibleAnimalProducts',
      },
    ],
    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
    colName: 'nwfp_category_2025',
    migration: {
      cycles: ['2025'],
      forceColName: true,
      style: {
        '2025': { minWidth: '170px' },
      },
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'nonWoodForestProductsRemovals',
          variableName: '#1',
          colName: 'category',
        },
      },
    },
  },
]

const linkedDataCols = (variableName) =>
  dataCols.map((col) => ({
    ...col,
    migration: {
      ...col.migration,
      linkedNodes: col.migration.linkedNodes
        ? Object.fromEntries(
            Object.entries(col.migration.linkedNodes).map(([key, node]) => [key, { ...node, variableName }])
          )
        : undefined,
    },
  }))

export const nonWoodGoods2015 = {
  sectionName: 'nonWoodGoods',
  sectionAnchor: '3.3',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_3_3',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.nonWoodGoods2015.rankValue',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.nonWoodGoods2015.nameOfGroupsOfProduct',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.nonWoodGoods2015.keySpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015.totalHarvestedNonWoodGoods',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.nonWoodGoods2015.marketValue1000NationalCurrency',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.nonWoodGoods2015.nwfpCategory',
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
                  rowSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015.unit',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015.quantity',
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
                  labelKey: 'panEuropean.nonWoodGoods2015._01st',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_1'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_01st',
              labelKey: 'panEuropean.nonWoodGoods2015._01st',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._02nd',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_2'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_02nd',
              labelKey: 'panEuropean.nonWoodGoods2015._02nd',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._03rd',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_3'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_03rd',
              labelKey: 'panEuropean.nonWoodGoods2015._03rd',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._04th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_4'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_04th',
              labelKey: 'panEuropean.nonWoodGoods2015._04th',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._05th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_5'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_05th',
              labelKey: 'panEuropean.nonWoodGoods2015._05th',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._06th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_6'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_06th',
              labelKey: 'panEuropean.nonWoodGoods2015._06th',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._07th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_7'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_07th',
              labelKey: 'panEuropean.nonWoodGoods2015._07th',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._08th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_8'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_08th',
              labelKey: 'panEuropean.nonWoodGoods2015._08th',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._09th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_9'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_09th',
              labelKey: 'panEuropean.nonWoodGoods2015._09th',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.nonWoodGoods2015._10th',
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('product_10'),
                // { idx: 5, type: 'text' },
              ],
              variableExport: '_10th',
              labelKey: 'panEuropean.nonWoodGoods2015._10th',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'panEuropean.nonWoodGoods2015.all_other_plant_products',
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
                        tableName: 'nonWoodForestProductsRemovals',
                        variableName: 'all_other_plant_products',
                        colName: 'value',
                      },
                    },
                  },
                },
                { idx: 1, type: 'placeholder' },
              ],
              variableExport: 'all_other_plant_products',
              labelKey: 'panEuropean.nonWoodGoods2015.all_other_plant_products',
              colSpan: 5,
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'panEuropean.nonWoodGoods2015.all_other_animal_products',
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
                        tableName: 'nonWoodForestProductsRemovals',
                        variableName: 'all_other_animal_products',
                        colName: 'value',
                      },
                    },
                  },
                },
                { idx: 1, type: 'placeholder' },
              ],
              variableExport: 'all_other_animal_products',
              labelKey: 'panEuropean.nonWoodGoods2015.all_other_animal_products',
              colSpan: 5,
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 5,
                  labelKey: 'panEuropean.nonWoodGoods2015.total',
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
                        tableName: 'nonWoodForestProductsRemovals',
                        variableName: 'totalValue',
                        colName: 'value',
                      },
                    },
                  },
                },
                { idx: 1, type: 'placeholder' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_3_3.total['name_of_groups_of_product'],
                     [table_3_3._10th['market_value_1000_national_currency'],table_3_3._09th['market_value_1000_national_currency'],
                     table_3_3._08th['market_value_1000_national_currency'],table_3_3._07th['market_value_1000_national_currency'],
                     table_3_3._06th['market_value_1000_national_currency'],table_3_3._05th['market_value_1000_national_currency'],
                     table_3_3._04th['market_value_1000_national_currency'],table_3_3._03rd['market_value_1000_national_currency'],
                     table_3_3._02nd['market_value_1000_national_currency'],table_3_3._01st['market_value_1000_national_currency']])`,
                  ],
                },
              },
              variableExport: 'total',
              labelKey: 'panEuropean.nonWoodGoods2015.total',
              colSpan: 5,
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [
            'name_of_groups_of_product',
            'key_species',
            'total_harvested_non_wood_goods_unit',
            'total_harvested_non_wood_goods_quantity',
            'market_value_1000_national_currency',
            'nwfp_category',
          ],
          migration: {
            columnNames: {
              '2020': [
                'name_of_groups_of_product',
                'key_species',
                'total_harvested_non_wood_goods_unit',
                'total_harvested_non_wood_goods_quantity',
                'market_value_1000_national_currency',
                'nwfp_category',
              ],
              '2025': [
                'name_of_groups_of_product',
                'key_species',
                'total_harvested_non_wood_goods_unit',
                'total_harvested_non_wood_goods_quantity',
                'market_value_1000_national_currency',
                'nwfp_category_2025',
              ],
            },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_3_3_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.product',
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
              'first',
              'second',
              'third',
              'fourth',
              'fifth',
              'sixth',
              'seventh',
              'eighth',
              'ninth',
              'tenth',
              'allOtherPlantProducts',
              'allOtherAnimalProducts',
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
                { idx: 0, type: 'textarea', colName: 'comment_trends' },
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
