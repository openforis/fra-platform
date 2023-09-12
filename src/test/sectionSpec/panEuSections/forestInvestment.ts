// @ts-nocheck

export const totalGrossFixedCapitalFormationInForestsAndForestry = {
  sectionName: 'totalGrossFixedCapitalFormationInForestsAndForestry',
  sectionAnchor: '6.4a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_4a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.grossFixedCapitalFormationMillionNationalCurrency',
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
                  labelKey:
                    'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.plantingOfTreesToProvideRegularIncome',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.equipmentAndBuildings',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.otherGrossFixedCapitalFormation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.total',
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
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_2020['total'],
                     [table_6_4a.forestry_isic_nace_02_2020['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_2020['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_2020['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2020 },
              variableExport: 'forestry_isic_nace_02_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_2015['total'],
                     [table_6_4a.forestry_isic_nace_02_2015['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_2015['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_2015['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2015 },
              variableExport: 'forestry_isic_nace_02_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_2010['total'],
                     [table_6_4a.forestry_isic_nace_02_2010['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_2010['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_2010['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2010 },
              variableExport: 'forestry_isic_nace_02_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_2005['total'],
                     [table_6_4a.forestry_isic_nace_02_2005['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_2005['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_2005['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2005 },
              variableExport: 'forestry_isic_nace_02_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_2000['total'],
                     [table_6_4a.forestry_isic_nace_02_2000['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_2000['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_2000['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2000 },
              variableExport: 'forestry_isic_nace_02_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_6_4a.forestry_isic_nace_02_1990['total'],
                     [table_6_4a.forestry_isic_nace_02_1990['other_gross_fixed_capital_formation'],table_6_4a.forestry_isic_nace_02_1990['planting_of_trees_to_provide_regular_income'],
                     table_6_4a.forestry_isic_nace_02_1990['equipment_and_buildings']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalGrossFixedCapitalFormationInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 1990 },
              variableExport: 'forestry_isic_nace_02_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionNationalCurrency',
          columnsExport: [
            'planting_of_trees_to_provide_regular_income',
            'equipment_and_buildings',
            'other_gross_fixed_capital_formation',
            'total',
          ],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.totalFixedCapitalFormationInForestsAndForestry',
      tableSpecs: [
        {
          name: 'table_6_4b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.fixedCapitalConsumptionMillionNationalCurrency',
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
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2020 },
              variableExport: 'forestry_isic_nace_02_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2015 },
              variableExport: 'forestry_isic_nace_02_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2010 },
              variableExport: 'forestry_isic_nace_02_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2005 },
              variableExport: 'forestry_isic_nace_02_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2000 },
              variableExport: 'forestry_isic_nace_02_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 1990 },
              variableExport: 'forestry_isic_nace_02_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionNationalCurrency',
          columnsExport: ['fixed_capital_consumption'],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.totalFixedCapitalTransfersInForestsAndForestry',
      tableSpecs: [
        {
          name: 'table_6_4c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalCapitalTransfersInForestsAndForestry.capitalTransfersMillionNationalCurrency',
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
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2020 },
              variableExport: 'forestry_isic_nace_02_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2015 },
              variableExport: 'forestry_isic_nace_02_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2010 },
              variableExport: 'forestry_isic_nace_02_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2005 },
              variableExport: 'forestry_isic_nace_02_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2000 },
              variableExport: 'forestry_isic_nace_02_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 1990 },
              variableExport: 'forestry_isic_nace_02_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionNationalCurrency',
          columnsExport: ['capital_transfers'],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_6_4_1',
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
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.generalComments',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
            },
            ...[
              'generalComments',
              'totalGrossFixedCapitalFormation',
              'grossFixedCapitalFormationInPlantingOfTreesToProvideRegularIncome',
              'grossFixedCapitalFormationInEquipmentAndBuildings',
              'otherGrossFixedCapitalFormation',
              'totalFixedCapitalConsumption',
              'fixedCapitalConsumptionInPlantingOfTreesToProvideRegularIncome',
              'fixedCapitalConsumptionInEquipmentAndBuildings',
              'otherFixedCapitalConsumption',
              'totalCapitalTransfers',
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
  migration: {
    anchors: {
      '2020': '6.4a',
      '2025': '6.4',
    },
    hidden: true,
  },
}
export const totalFixedCapitalConsumptionInForestsAndForestry = {
  sectionName: 'totalFixedCapitalConsumptionInForestsAndForestry',
  sectionAnchor: '6.4b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_4b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.fixedCapitalConsumptionMillionNationalCurrency',
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
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2020 },
              variableExport: 'forestry_isic_nace_02_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2015 },
              variableExport: 'forestry_isic_nace_02_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2010 },
              variableExport: 'forestry_isic_nace_02_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2005 },
              variableExport: 'forestry_isic_nace_02_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2000 },
              variableExport: 'forestry_isic_nace_02_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalFixedCapitalConsumptionInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 1990 },
              variableExport: 'forestry_isic_nace_02_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionNationalCurrency',
          columnsExport: ['fixed_capital_consumption'],
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
export const totalCapitalTransfersInForestsAndForestry = {
  sectionName: 'totalCapitalTransfersInForestsAndForestry',
  sectionAnchor: '6.4c',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_4c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalCapitalTransfersInForestsAndForestry.capitalTransfersMillionNationalCurrency',
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
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2020 },
              variableExport: 'forestry_isic_nace_02_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2015 },
              variableExport: 'forestry_isic_nace_02_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2010 },
              variableExport: 'forestry_isic_nace_02_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2005 },
              variableExport: 'forestry_isic_nace_02_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 2000 },
              variableExport: 'forestry_isic_nace_02_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalCapitalTransfersInForestsAndForestry.forestry_isic_nace_02',
              labelParams: { year: 1990 },
              variableExport: 'forestry_isic_nace_02_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionNationalCurrency',
          columnsExport: ['capital_transfers'],
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
