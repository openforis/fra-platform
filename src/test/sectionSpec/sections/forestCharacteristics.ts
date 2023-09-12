// @ts-nocheck
import { fraYears } from '../fraYears'
import { reportYears } from '../reportYears'
import { SectionSpec } from '../sectionSpec'

export const forestCharacteristics: SectionSpec = {
  sectionName: 'forestCharacteristics',
  sectionAnchor: '1b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'forestCharacteristics',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'forestCharacteristics.categoryHeader',
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
                  colSpan: null,
                  rowSpan: 1,
                  labelKey: 'fra.forestArea100HaYear',
                  className: 'fra-table__header-cell',
                  type: 'header',
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
                  labelKey: 'forestCharacteristics.naturalForestArea',
                  variableNo: 'a',
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
              labelKey: 'forestCharacteristics.naturalForestArea',
              variableNo: 'a',
              variableName: 'naturalForestArea',
              variableExport: 'natural_forest_area',
              chartProps: {
                labelKey: 'forestCharacteristics.naturalForestArea',
                color: '#0098a6',
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
                  labelKey: 'fra.forestCharacteristics.primaryForest',
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
              labelKey: 'forestCharacteristics.primaryForest',
              variableName: 'primaryForest',
              migration: {
                cycles: ['2025'],
                categoryLevel: 1,
                validateFns: [
                  `validatorSubCategory(forestCharacteristics.naturalForestArea,[forestCharacteristics.primaryForest])`,
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
                  labelKey: 'forestCharacteristics.plantedForest',
                  variableNo: 'b',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    variableNo: { '2020': 'b', '2025': 'b=b1+b2' },
                  },
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'calculated',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              labelKey: 'forestCharacteristics.plantedForest',
              variableNo: 'b',
              variableName: 'plantedForest',
              variableExport: 'planted_forest',
              chartProps: {
                labelKey: 'forestCharacteristics.plantedForest',
                color: '#f58833',
              },
              migration: {
                chart: {
                  cycles: ['2025'],
                },
                calcFormula: `(forestCharacteristics.plantationForestArea || forestCharacteristics.otherPlantedForestArea) 
      ? (forestCharacteristics.plantationForestArea || 0) + (forestCharacteristics.otherPlantedForestArea || 0) 
      : null`,
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
                  labelKey: 'forestCharacteristics.plantationForestArea',
                  className: 'fra-table__category-cell',
                  migration: {
                    variableNo: { '2025': 'b1' },
                    label: {
                      '2020': { key: 'forestCharacteristics.plantationForestArea' },
                      '2025': { key: 'fra.forestCharacteristics.ofWhichPlantationForest' },
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
              labelKey: 'forestCharacteristics.plantationForestArea',
              variableName: 'plantationForestArea',
              variableExport: 'plantation_forest_area',
              chartProps: {
                labelKey: 'forestCharacteristics.plantationForestArea',
                color: '#bf00af',
              },
              migration: {
                chart: {
                  cycles: ['2020'],
                },
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
                  labelKey: 'forestCharacteristics.plantationForestIntroducedArea',
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
              labelKey: 'forestCharacteristics.plantationForestIntroducedArea',
              variableName: 'plantationForestIntroducedArea',
              variableExport: 'plantation_forest_introduced_area',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorPlantationForestIntroduced(forestCharacteristics.plantationForestArea, forestCharacteristics.plantationForestIntroducedArea)`,
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
                  labelKey: 'forestCharacteristics.otherPlantedForestArea',
                  className: 'fra-table__category-cell',
                  migration: {
                    variableNo: { '2025': 'b2' },
                    label: {
                      '2020': { key: 'forestCharacteristics.otherPlantedForestArea' },
                      '2025': { key: 'fra.forestCharacteristics.ofWhichOtherPlantedForest' },
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
              labelKey: 'forestCharacteristics.otherPlantedForestArea',
              variableName: 'otherPlantedForestArea',
              variableExport: 'other_planted_forest_area',
              chartProps: {
                labelKey: 'forestCharacteristics.otherPlantedForestArea',
                color: '#f58833',
              },
              migration: {
                chart: {
                  cycles: ['2020'],
                },
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
                  labelKey: 'forestCharacteristics.total',
                  variableNo: 'a+b',
                  className: 'fra-table__header-cell-left',
                },
                ...fraYears.map(({ colName, cycles }, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'calculated',
                  colName,
                  migration: {
                    cycles: cycles ?? ['2020', '2025'],
                  },
                })),
              ],
              labelKey: 'forestCharacteristics.total',
              variableNo: 'a+b',
              variableName: 'totalForestArea', // before it was total
              migration: {
                calcFormula: `(forestCharacteristics.naturalForestArea || forestCharacteristics.plantedForest)
      ? (forestCharacteristics.naturalForestArea || 0) + (forestCharacteristics.plantedForest || 0)
      : null`,
                validateFns: [`validatorTotalForest(extentOfForest.forestArea, forestCharacteristics.totalForestArea)`],
              },
            },
            // {
            //   idx: 7,
            //   type: 'data',
            //   cols: [
            //     {
            //       idx: 'header_0',
            //       type: 'header',
            //       colSpan: 1,
            //       labelKey: 'forestCharacteristics.totalForestArea',
            //       linkToSection: 'extentOfForest',
            //       className: 'fra-table__header-cell-left',
            //     },
            //     ...fraYears.map((year, idx) => ({
            //       idx,
            //       colSpan: 1,
            //       rowSpan: 1,
            //       type: 'calculated',
            //       colName: `${year}`,
            //     })),
            //   ],
            //   labelKey: 'forestCharacteristics.totalForestArea',
            //   linkToSection: 'extentOfForest',
            //   variableName: 'forestArea', // before it was totalForestArea
            //   migration: {
            //     calcFormula: 'extentOfForest.forestArea',
            //   },
            // },
            {
              idx: 8,
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
              idx: 9,
              type: 'validationMessages',
              cols: [],
            },
          ],
          tableDataRequired: [
            {
              assessmentType: 'fra2020',
              sectionName: 'extentOfForest',
              tableName: 'extentOfForest',
            },
          ],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
          unit: 'haThousand',
          odp: true,
          odpVariables: {
            naturalForestArea: 'naturalForestArea',
            plantationForestArea: 'plantationForestArea',
            plantationForestIntroducedArea: 'plantationForestIntroducedArea',
            otherPlantedForestArea: 'otherPlantedForestArea',
          },
          showOdpChart: true,
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
          name: 'primaryForestByClimaticDomain',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'fra.primaryForestByClimaticDomain.primaryForestByClimaticDomain' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: null,
                  rowSpan: 1,
                  labelKey: 'fra.primaryForestByClimaticDomain.primaryForestArea100Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: { '2025': { colSpan: reportYears.length, rowSpan: 1 } },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: reportYears.map((year, idx) => ({
                idx,
                colSpan: 1,
                rowSpan: 1,
                type: 'header',
                colName: `${year}`,
              })),
              type: 'header',
            },
            ...[
              'primaryForestBoreal',
              'primaryForestTemperate',
              'primaryForestSubTropical',
              'primaryForestTropical',
            ].map((variableName, rowIdx) => ({
              idx: rowIdx,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: `fra.primaryForestByClimaticDomain.${variableName}`,
                  className: 'fra-table__subcategory-cell',
                },
                ...reportYears.map((year, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'decimal',
                  colName: `${year}`,
                })),
              ],
              labelKey: `fra.primaryForestByClimaticDomain.${variableName}`,
              variableName,
              migration: {
                categoryLevel: 1,
              },
            })),
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: `fra.primaryForestByClimaticDomain.totalPrimaryForest`,
                  className: 'fra-table__subcategory-cell',
                },
                ...reportYears.map((year, idx) => ({
                  idx,
                  colSpan: 1,
                  rowSpan: 1,
                  type: 'calculated',
                  colName: `${year}`,
                })),
              ],
              variableName: 'totalPrimaryForest',
              migration: {
                categoryLevel: 1,
                calcFormula: `(primaryForestByClimaticDomain.primaryForestBoreal || primaryForestByClimaticDomain.primaryForestTemperate || primaryForestByClimaticDomain.primaryForestSubTropical || primaryForestByClimaticDomain.primaryForestTropical)
                  ? (primaryForestByClimaticDomain.primaryForestBoreal || 0) + (primaryForestByClimaticDomain.primaryForestTemperate || 0) + (primaryForestByClimaticDomain.primaryForestSubTropical || 0) + (primaryForestByClimaticDomain.primaryForestTropical || 0)
                  : null`,
                validateFns: [
                  `validatorSumNotGreaterThan(primaryForestByClimaticDomain.totalPrimaryForest, forestCharacteristics.primaryForest)`,
                ],
              },
            },
          ],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': reportYears },
          },
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    comments: true,
    introductoryText: false,
  },
  dataExport: {
    included: true,
  },
}
