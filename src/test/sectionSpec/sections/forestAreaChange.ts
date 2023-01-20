// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const forestAreaChange: SectionSpec = {
  sectionName: 'forestAreaChange',
  sectionAnchor: '1d',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'forestAreaChange',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'forestAreaChange.categoryHeader',
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
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey: 'forestAreaChange.areaUnitLabel',
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
                  label: '1990-2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2000-2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010-2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015-2020',
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
                  labelKey: 'forestAreaChange.forestExpansion',
                  variableNo: 'a',
                  className: 'fra-table__category-cell',
                  migration: {
                    variableNo: {
                      '2020': 'a',
                      '2025': 'a=a1+a2',
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
                {
                  idx: 1,
                  type: 'decimal',
                },
                {
                  idx: 2,
                  type: 'decimal',
                },
                {
                  idx: 3,
                  type: 'decimal',
                },
              ],
              labelKey: 'forestAreaChange.forestExpansion',
              variableExport: 'forest_expansion',
              variableNo: 'a',
              migration: {
                validateFns: [`validatorGreaterThanOrZero(forestAreaChange.forest_expansion)`],
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
                  labelKey: 'forestAreaChange.ofWhichAfforestation',
                  className: 'fra-table__subcategory-cell',
                  migration: {
                    variableNo: { '2025': 'a1' },
                  },
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
                {
                  idx: 1,
                  type: 'decimal',
                },
                {
                  idx: 2,
                  type: 'decimal',
                },
                {
                  idx: 3,
                  type: 'decimal',
                },
              ],
              labelKey: 'forestAreaChange.ofWhichAfforestation',
              variableExport: 'afforestation',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorSubCategory(forestAreaChange.forest_expansion, [forestAreaChange.afforestation, forestAreaChange.natural_expansion])`,
                ],
                categoryLevel: 1,
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
                  labelKey: 'forestAreaChange.ofWhichNaturalExpansion',
                  className: 'fra-table__subcategory-cell',
                  migration: {
                    variableNo: { '2025': 'a2' },
                  },
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
                {
                  idx: 1,
                  type: 'decimal',
                },
                {
                  idx: 2,
                  type: 'decimal',
                },
                {
                  idx: 3,
                  type: 'decimal',
                },
              ],
              labelKey: 'forestAreaChange.ofWhichNaturalExpansion',
              variableExport: 'natural_expansion',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorSubCategory(forestAreaChange.forest_expansion, [forestAreaChange.afforestation, forestAreaChange.natural_expansion])`,
                ],
                categoryLevel: 1,
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
                  labelKey: 'forestAreaChange.deforestation',
                  variableNo: 'b',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
                {
                  idx: 1,
                  type: 'decimal',
                },
                {
                  idx: 2,
                  type: 'decimal',
                },
                {
                  idx: 3,
                  type: 'decimal',
                },
              ],
              labelKey: 'forestAreaChange.deforestation',
              variableExport: 'deforestation',
              variableNo: 'b',
              migration: {
                validateFns: [`validatorGreaterThanOrZero(forestAreaChange.deforestation)`],
              },
            },
            {
              idx: 4,
              type: 'data',
              variableName: 'forestAreaNetChange',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'forestAreaChange.forestAreaNetChange',
                  variableNo: 'a-b',
                  linkToSection: 'extentOfForest',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '1990_2000',
                  migration: {
                    calculateFn: `(extentOfForest.forestArea['2000'] - extentOfForest.forestArea['1990']) / 10`,
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2000_2010',
                  migration: {
                    calculateFn: `(extentOfForest.forestArea['2010'] - extentOfForest.forestArea['2000']) / 10`,
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2010_2015',
                  migration: {
                    calculateFn: `(extentOfForest.forestArea['2015'] - extentOfForest.forestArea['2010']) / 5`,
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2015_2020',
                  migration: {
                    calculateFn: `(extentOfForest.forestArea['2020'] - extentOfForest.forestArea['2015']) / 5`,
                  },
                },
              ],
              labelKey: 'forestAreaChange.forestAreaNetChange',
              variableNo: 'a-b',
              linkToSection: 'extentOfForest',
            },
            {
              idx: 5,
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
              idx: 6,
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
          columnsExport: ['1990-2000', '2000-2010', '2010-2015', '2015-2020'],
          unit: 'haThousandPerYear',
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
