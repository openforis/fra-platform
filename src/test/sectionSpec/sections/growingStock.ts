// @ts-nocheck
import { fraYears } from '../fraYears'
import { SectionSpec } from '../sectionSpec'
import { getStatusAndTierTable } from './common/statusAndTierTable'

export const growingStock: SectionSpec = {
  sectionName: 'growingStock',
  sectionAnchor: '2a',
  tableSections: [
    {
      descriptionKey: 'growingStock.supportText',
      tableSpecs: [
        {
          name: 'growingStockAvg',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStock.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'fra.categoryHeader2020' },
                      '2025': { key: 'fra.categoryHeader2025' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 9,
                  rowSpan: 1,
                  labelKey: 'growingStock.avgTableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 9, rowSpan: 1 },
                      '2025': { colSpan: 6, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: fraYears.map(({ colName, cycles }, idx) => ({
                idx,
                colSpan: 1,
                rowSpan: 1,
                type: 'header',
                colName,
                migration: {
                  cycles: cycles ?? ['2020', '2025'],
                },
              })),
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
                  labelKey: 'growingStock.naturallyRegeneratingForest',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'naturallyRegeneratingForest',
              labelKey: 'growingStock.naturallyRegeneratingForest',
              subcategory: false,
              migration: {
                calcFormula:
                  '(growingStockTotal.naturallyRegeneratingForest * 1000) / forestCharacteristics.naturalForestArea',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'naturalForestArea' }],
              },
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.forestCharacteristics.primaryForest' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'primaryForest',
              labelKey: 'growingStock.primaryForest',
              migration: {
                cycles: ['2025'],
                calcFormula: '(growingStockTotal.primaryForest * 1000) / forestCharacteristics.primaryForest',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'primaryForest' }],
                categoryLevel: 1,
              },
              subcategory: false,
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.plantedForest',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantedForest',
              labelKey: 'growingStock.plantedForest',
              subcategory: false,
              migration: {
                calcFormula: '(growingStockTotal.plantedForest * 1000) / forestCharacteristics.plantedForest',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'plantedForest' }],
              },
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.plantationForest',
                  className: 'fra-table__subcategory-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantationForest',
              labelKey: 'growingStock.plantationForest',
              subcategory: true,
              migration: {
                calcFormula: '(growingStockTotal.plantationForest * 1000) / forestCharacteristics.plantationForestArea',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'plantationForestArea' }],
                categoryLevel: 1,
              },
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.forestCharacteristics.plantationForestIntroducedArea2025' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantationForestIntroducedArea',
              subcategory: false,
              migration: {
                cycles: ['2025'],
                calcFormula:
                  '(growingStockTotal.plantationForestIntroducedArea * 1000) / forestCharacteristics.plantationForestIntroducedArea',
                readonly: false,
                dependantsExclude: [
                  { tableName: 'forestCharacteristics', variableName: 'plantationForestIntroducedArea' },
                ],
                categoryLevel: 2,
              },
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.otherPlantedForest',
                  className: 'fra-table__subcategory-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'otherPlantedForest',
              labelKey: 'growingStock.otherPlantedForest',
              subcategory: true,
              migration: {
                calcFormula:
                  '(growingStockTotal.otherPlantedForest * 1000) / forestCharacteristics.otherPlantedForestArea',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'otherPlantedForestArea' }],
                categoryLevel: 1,
              },
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.forest',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'growingStock.forest' },
                      '2025': { key: 'fra.growingStock.totalForest' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'forest',
              labelKey: 'growingStock.forest',
              subcategory: false,
              migration: {
                calcFormula: '(growingStockTotal.forest * 1000) / extentOfForest.forestArea',
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
              },
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.otherWoodedLand',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'otherWoodedLand',
              labelKey: 'growingStock.otherWoodedLand',
              subcategory: false,
              migration: {
                calcFormula: '(growingStockTotal.otherWoodedLand * 1000) / extentOfForest.otherWoodedLand',
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'otherWoodedLand' }],
              },
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: false,
          columnsExportAlways: [],
          // odp: true,
          odpVariables: {
            naturallyRegeneratingForest: 'naturallyRegeneratingForest',
            plantedForest: 'plantedForest',
            plantationForest: 'plantationForest',
            otherPlantedForest: 'otherPlantedForest',
            forest: 'forest',
            otherWoodedLand: 'otherWoodedLand',
          },
          migration: {
            columnNames: {
              '2020': ['1990', '2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['1990', '2000', '2010', '2015', '2020', '2025'],
            },
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'growingStockTotal',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStock.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'fra.categoryHeader2020' },
                      '2025': { key: 'fra.categoryHeader2025' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 9,
                  rowSpan: 1,
                  labelKey: 'growingStock.totalTableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 9, rowSpan: 1 },
                      '2025': { colSpan: 6, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: fraYears.map(({ colName, cycles }, idx) => ({
                idx,
                colSpan: 1,
                rowSpan: 1,
                type: 'header',
                colName,
                migration: {
                  cycles: cycles ?? ['2020', '2025'],
                },
              })),
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
                  labelKey: 'growingStock.naturallyRegeneratingForest',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'naturallyRegeneratingForest',
              variableExport: 'naturally_regenerating_forest',
              labelKey: 'growingStock.naturallyRegeneratingForest',
              subcategory: false,
              migration: {
                calcFormula:
                  '(growingStockAvg.naturallyRegeneratingForest * forestCharacteristics.naturalForestArea) / 1000',
                readonly: false,
                validateFns: [
                  'validatorEqualToTotalForest(growingStockTotal.forest, [growingStockTotal.naturallyRegeneratingForest,growingStockTotal.plantedForest])',
                ],
              },
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.forestCharacteristics.primaryForest' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'primaryForest',
              labelKey: 'growingStock.primaryForest',
              subcategory: false,
              migration: {
                cycles: ['2025'],
                calcFormula: '(growingStockAvg.primaryForest * forestCharacteristics.primaryForest) / 1000',
                readonly: false,
                dependantsExclude: [{ tableName: 'forestCharacteristics', variableName: 'primaryForest' }],
                categoryLevel: 1,
                validateFns: [
                  `validatorSubCategory(growingStockTotal.naturallyRegeneratingForest,[growingStockTotal.primaryForest])`,
                ],
              },
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.plantedForest',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantedForest',
              variableExport: 'planted_forest',
              labelKey: 'growingStock.plantedForest',
              subcategory: false,
              migration: {
                calcFormula: '(growingStockAvg.plantedForest * forestCharacteristics.plantedForest) / 1000',
                readonly: false,
                validateFns: [
                  'validatorEqualToTotalForest(growingStockTotal.forest, [growingStockTotal.naturallyRegeneratingForest,growingStockTotal.plantedForest])',
                ],
              },
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.plantationForest',
                  className: 'fra-table__subcategory-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantationForest',
              variableExport: 'plantation_forest',
              labelKey: 'growingStock.plantationForest',
              subcategory: true,
              migration: {
                calcFormula: '(growingStockAvg.plantationForest * forestCharacteristics.plantationForestArea) / 1000',
                readonly: false,
                validateFns: [
                  `validatorSubCategory(growingStockTotal.plantedForest,[growingStockTotal.plantationForest,growingStockTotal.otherPlantedForest])`,
                ],
                categoryLevel: 1,
              },
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.forestCharacteristics.plantationForestIntroducedArea2025' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'plantationForestIntroducedArea',
              subcategory: false,
              migration: {
                cycles: ['2025'],
                calcFormula:
                  '(growingStockAvg.plantationForestIntroducedArea * forestCharacteristics.plantationForestIntroducedArea) / 1000',
                validateFns: [
                  `validatorSubCategory(growingStockTotal.plantationForest,[growingStockTotal.plantationForestIntroducedArea])`,
                ],
                readonly: false,
                dependantsExclude: [
                  { tableName: 'forestCharacteristics', variableName: 'plantationForestIntroducedArea' },
                ],
                categoryLevel: 2,
              },
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.otherPlantedForest',
                  className: 'fra-table__subcategory-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'otherPlantedForest',
              variableExport: 'other_planted_forest',
              labelKey: 'growingStock.otherPlantedForest',
              subcategory: true,
              migration: {
                calcFormula:
                  '(growingStockAvg.otherPlantedForest * forestCharacteristics.otherPlantedForestArea) / 1000',
                readonly: false,
                validateFns: [
                  `validatorSubCategory(growingStockTotal.plantedForest,[growingStockTotal.plantationForest,growingStockTotal.otherPlantedForest])`,
                ],
                categoryLevel: 1,
              },
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.forest',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'growingStock.forest' },
                      '2025': { key: 'fra.growingStock.totalForest' },
                    },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'forest',
              variableExport: 'forest',
              labelKey: 'growingStock.forest',
              subcategory: false,
              validator: null,
              migration: {
                calcFormula: '(growingStockAvg.forest * extentOfForest.forestArea) / 1000',
                validateFns: [
                  'validatorEqualToTotalForest(growingStockTotal.forest, [growingStockTotal.naturallyRegeneratingForest,growingStockTotal.plantedForest])',
                ],
                readonly: false,
              },
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStock.otherWoodedLand',
                  className: 'fra-table__category-cell',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              variableName: 'otherWoodedLand',
              variableExport: 'other_wooded_land',
              labelKey: 'growingStock.otherWoodedLand',
              subcategory: false,
              validator: null,
              migration: {
                calcFormula: '(growingStockAvg.otherWoodedLand * extentOfForest.otherWoodedLand) / 1000',
                readonly: false,
              },
            },
            {
              idx: 6,
              type: 'noticeMessage',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: null,
                  type: 'noticeMessage',
                },
              ],
            },
            {
              idx: 7,
              type: 'validationMessages',
              cols: [],
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
          unit: 'millionsCubicMeterOverBark',
          // odp: true,
          odpVariables: {
            naturallyRegeneratingForest: 'naturallyRegeneratingForest',
            plantedForest: 'plantedForest',
            plantationForest: 'plantationForest',
            otherPlantedForest: 'otherPlantedForest',
            forest: 'forest',
            otherWoodedLand: 'otherWoodedLand',
          },
          migration: {
            columnNames: {
              '2020': ['1990', '2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['1990', '2000', '2010', '2015', '2020', '2025'],
            },
          },
        },
      ],
    },
    {
      tableSpecs: [...getStatusAndTierTable('growingStock', 'growingStock')],
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
