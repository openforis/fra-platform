// @ts-nocheck
import { fraYears } from '../fraYears'
import { SectionSpec } from '../sectionSpec'
import { getStatusAndTierTable } from './common/statusAndTierTable'

const validateSumOverride = `validatorSumNotGreaterThan((climaticDomain.boreal || 0) + (climaticDomain.temperate || 0) + (climaticDomain.sub_tropical || 0) + (climaticDomain.tropical || 0), '100')`

export const extentOfForest: SectionSpec = {
  sectionName: 'extentOfForest',
  sectionAnchor: '1a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'extentOfForest',
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
                      '2020': { key: 'fra.categoryHeader2020' },
                      '2025': { key: 'fra.categoryHeader2025' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: null,
                  rowSpan: 1,
                  labelKey: 'fra.area100Ha',
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
                  labelKey: 'extentOfForest.forestArea',
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
              labelKey: 'extentOfForest.forestArea',
              variableNo: 'a',
              variableName: 'forestArea',
              variableExport: 'forest_area',
              chartProps: {
                labelKey: 'fraClass.forest',
                color: '#0098a6',
              },
              migration: {
                validateFns: {
                  '2020': [
                    `validatorForestAreaComparedTo2015(extentOfForest.forestArea['2015'], extentOfForest.forestArea)`,
                  ],
                },
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
                  labelKey: 'fraClass.otherWoodedLand',
                  variableNo: 'b',
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
              labelKey: 'fraClass.otherWoodedLand',
              variableNo: 'b',
              variableName: 'otherWoodedLand',
              variableExport: 'other_wooded_land',
              chartProps: {
                labelKey: 'fraClass.otherWoodedLand',
                color: '#bf00af',
              },
              migration: {
                validateFns: [`validatorOtherLand(extentOfForest.otherLand, extentOfForest.totalLandArea)`],
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
                  variableNo: 'c-a-b',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: {
                      '2020': { key: 'fraClass.otherLand' },
                      '2025': { key: 'fra.extentOfForest.remainingLandArea' },
                    },
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
              variableNo: 'c-a-b',
              variableName: 'otherLand',
              variableExport: 'other_land',
              migration: {
                calcFormula:
                  'extentOfForest.totalLandArea - (extentOfForest.forestArea || 0) - (extentOfForest.otherWoodedLand || 0)',
                validateFns: [`validatorOtherLand(extentOfForest.otherLand, extentOfForest.totalLandArea)`],
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
                  labelKey: 'extentOfForest.totalLandArea',
                  variableNo: 'c',
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
              labelKey: 'extentOfForest.totalLandArea',
              variableNo: 'c',
              variableName: 'totalLandArea',
              // variableName: 'faoStat',
              variableExport: 'total_land_area',
              migration: {
                readonly: true,
              },
            },
            {
              idx: 4,
              type: 'noticeMessage',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'extentOfForest.tableNoticeMessage',
                  type: 'noticeMessage',
                },
              ],
              migration: {
                cycles: ['2020'],
              },
            },
            {
              idx: 5,
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
          odp: true,
          odpVariables: {
            forestArea: 'forestArea',
            otherWoodedLand: 'otherWoodedLand',
          },
          showOdpChart: true,
          unit: 'haThousand',
          migration: {
            columnNames: {
              '2020': ['1990', '2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['1990', '2000', '2010', '2015', '2020', '2025'],
            },
          },
        },
        {
          name: 'climaticDomain',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'climaticDomain.climaticDomain',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'climaticDomain.percentOfForestArea2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'climaticDomain.percentOfForestArea2015' },
                      '2025': { key: 'fra.climaticDomain.percentOfForestArea' },
                    },
                  },
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'climaticDomain.percentOfForestArea2015Override',
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
                  labelKey: 'climaticDomain.boreal',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'calculated',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
              ],
              labelKey: 'climaticDomain.boreal',
              migration: {
                validateFns: [`validatorNotGreaterThan(climaticDomain.boreal, '100')`, validateSumOverride],
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
                  labelKey: 'climaticDomain.temperate',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'calculated',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
              ],
              labelKey: 'climaticDomain.temperate',
              migration: {
                validateFns: [`validatorNotGreaterThan(climaticDomain.temperate, '100')`, validateSumOverride],
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
                  labelKey: 'climaticDomain.subtropical',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'calculated',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
              ],
              labelKey: 'climaticDomain.subtropical',
              migration: {
                validateFns: [`validatorNotGreaterThan(climaticDomain.sub_tropical, '100')`, validateSumOverride],
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
                  labelKey: 'climaticDomain.tropical',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'calculated',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
              ],
              labelKey: 'climaticDomain.tropical',
              migration: {
                validateFns: [`validatorNotGreaterThan(climaticDomain.tropical, '100')`, validateSumOverride],
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
        },
        ...getStatusAndTierTable('extentOfForest', 'forestArea', true),
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
