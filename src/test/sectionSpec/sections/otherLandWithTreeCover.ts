// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

const validateSumOtherLandWithTreeCover = `validatorRemainingLandWithTreeCoverTotal((otherLandWithTreeCover.palms || 0) + (otherLandWithTreeCover.tree_orchards || 0) + (otherLandWithTreeCover.agroforestry || 0) + (otherLandWithTreeCover.trees_in_urban_settings || 0) + (otherLandWithTreeCover.other || 0), extentOfForest.otherLand)`

export const otherLandWithTreeCover: SectionSpec = {
  sectionName: 'otherLandWithTreeCover',
  sectionAnchor: '1f',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'otherLandWithTreeCover',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'otherLandWithTreeCover.categoryHeader',
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
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'otherLandWithTreeCover.areaUnitLabel',
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
                  label: 1990,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2000,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2010,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2015,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2020,
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
                  labelKey: 'otherLandWithTreeCover.palms',
                  variableNo: 'a',
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
                {
                  idx: 4,
                  type: 'decimal',
                },
              ],
              labelKey: 'otherLandWithTreeCover.palms',
              variableExport: 'palms',
              variableNo: 'a',
              migration: {
                validateFns: [validateSumOtherLandWithTreeCover],
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
                  labelKey: 'otherLandWithTreeCover.treeorchards',
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
                {
                  idx: 4,
                  type: 'decimal',
                },
              ],
              labelKey: 'otherLandWithTreeCover.treeorchards',
              variableExport: 'tree_orchards',
              variableNo: 'b',
              migration: {
                validateFns: [validateSumOtherLandWithTreeCover],
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
                  labelKey: 'otherLandWithTreeCover.agroforestry',
                  variableNo: 'c',
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
                {
                  idx: 4,
                  type: 'decimal',
                },
              ],
              labelKey: 'otherLandWithTreeCover.agroforestry',
              variableExport: 'agroforestry',
              variableNo: 'c',
              migration: {
                validateFns: [validateSumOtherLandWithTreeCover],
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
                  labelKey: 'otherLandWithTreeCover.treesinurbansettings',
                  variableNo: 'd',
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
                {
                  idx: 4,
                  type: 'decimal',
                },
              ],
              labelKey: 'otherLandWithTreeCover.treesinurbansettings',
              variableExport: 'trees_in_urban_settings',
              variableNo: 'd',
              migration: {
                validateFns: [validateSumOtherLandWithTreeCover],
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
                  labelKey: 'otherLandWithTreeCover.other',
                  variableNo: 'e',
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
                {
                  idx: 4,
                  type: 'decimal',
                },
              ],
              labelKey: 'otherLandWithTreeCover.other',
              variableExport: 'other',
              variableNo: 'e',
              migration: {
                validateFns: [validateSumOtherLandWithTreeCover],
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
                  labelKey: 'otherLandWithTreeCover.total',
                  variableNo: 'a+b+c+d+e',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'calculated',
                },
                {
                  idx: 1,
                  type: 'calculated',
                },
                {
                  idx: 2,
                  type: 'calculated',
                },
                {
                  idx: 3,
                  type: 'calculated',
                },
                {
                  idx: 4,
                  type: 'calculated',
                },
              ],
              labelKey: 'otherLandWithTreeCover.total',
              variableNo: 'a+b+c+d+e',
              mainCategory: true,
              variableName: 'otherLandWithTreeCoverTotal',
              migration: {
                calcFormula:
                  '(otherLandWithTreeCover.palms || 0) + (otherLandWithTreeCover.tree_orchards || 0) + (otherLandWithTreeCover.agroforestry || 0) + (otherLandWithTreeCover.trees_in_urban_settings || 0) + (otherLandWithTreeCover.other || 0)',
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                validateFns: [
                  `validatorOtherLandWithTreeCoverTotal(otherLandWithTreeCover.otherLand,otherLandWithTreeCover.otherLandWithTreeCoverTotal)`,
                ],
                cycles: ['2020'],
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
                  linkToSection: 'extentOfForest',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'otherLandWithTreeCover.otherLandArea' },
                      '2025': { key: 'fra.extentOfForest.remainingLandArea' },
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'calculated',
                },
                {
                  idx: 1,
                  type: 'calculated',
                },
                {
                  idx: 2,
                  type: 'calculated',
                },
                {
                  idx: 3,
                  type: 'calculated',
                },
                {
                  idx: 4,
                  type: 'calculated',
                },
              ],
              linkToSection: 'extentOfForest',
              variableName: 'otherLand',
              migration: {
                calcFormula: 'extentOfForest.otherLand',
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                cycles: ['2020'],
              },
            },
            {
              idx: 7,
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
              idx: 8,
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
          columnsExport: [1990, 2000, 2010, 2015, 2020],
          unit: 'haThousand',
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
      '2020': '1f',
      '2025': '1e',
    },
  },
}
