// @ts-nocheck

import { updatedDataCol } from '../panEuHelpers/updatedDataCol'

const totalForestAndOtherCols = [
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
]
const broadleavedCols = [
  {
    idx: 0,
    type: 'decimal',
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_5.broadleaved_yearPlaceholder['total'],
          [table_4_5.broadleaved_yearPlaceholder['standing'],table_4_5.broadleaved_yearPlaceholder['lying']],
          "table_4_5.broadleaved_yearPlaceholder[total]")`,
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
          `validatorEqualToSum(table_4_5.broadleaved_yearPlaceholder['total'],
            [table_4_5.broadleaved_yearPlaceholder['standing'],table_4_5.broadleaved_yearPlaceholder['lying']],
            "table_4_5.broadleaved_yearPlaceholder[total]")`,
        ],
      },
    },
  },
]
const coniferousCols = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_yearPlaceholder['total'],
           [table_4_5.coniferous_yearPlaceholder['total'],table_4_5.broadleaved_yearPlaceholder['total']],
           "table_4_5.total_forest_and_other_wooded_land_yearPlaceholder[total]")`,
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
          `validatorEqualToSum(table_4_5.coniferous_yearPlaceholder['total'],
          [table_4_5.coniferous_yearPlaceholder['standing'],table_4_5.coniferous_yearPlaceholder['lying']],
          "table_4_5.coniferous_yearPlaceholder[total]")`,
          `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_yearPlaceholder['standing'],
            [table_4_5.coniferous_yearPlaceholder['standing'],table_4_5.broadleaved_yearPlaceholder['standing']],
            "table_4_5.total_forest_and_other_wooded_land_yearPlaceholder[standing]")`,
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
          `validatorEqualToSum(table_4_5.coniferous_yearPlaceholder['total'],
            [table_4_5.coniferous_yearPlaceholder['standing'],table_4_5.coniferous_yearPlaceholder['lying']],
            "table_4_5.coniferous_yearPlaceholder[total]")`,
          `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_yearPlaceholder['lying'],
          [table_4_5.coniferous_yearPlaceholder['lying'],table_4_5.broadleaved_yearPlaceholder['lying']],
          "table_4_5.total_forest_and_other_wooded_land_yearPlaceholder[lying]")`,
        ],
      },
    },
  },
]

export const deadwood = {
  sectionName: 'deadwood',
  sectionAnchor: '4.5',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_4_5',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.deadwood.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.deadwood.volumeOfDeadwoodM3Ha',
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
                  labelKey: 'panEuropean.deadwood.total',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.deadwood.standing',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.deadwood.lying',
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
                  labelKey: 'panEuropean.deadwood.forest',
                  labelParams: { year: 2020 },
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
                    `validatorEqualToSum(table_4_5.forest_2020['total'],
                     [table_4_5.forest_2020['standing'],table_4_5.forest_2020['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.forest',
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
                    `validatorEqualToSum(table_4_5.forest_2015['total'],
                     [table_4_5.forest_2015['standing'],table_4_5.forest_2015['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.forest',
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
                    `validatorEqualToSum(table_4_5.forest_2010['total'],
                     [table_4_5.forest_2010['standing'],table_4_5.forest_2010['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.forest',
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
                    `validatorEqualToSum(table_4_5.forest_2005['total'],
                     [table_4_5.forest_2005['standing'],table_4_5.forest_2005['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.forest',
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
                    `validatorEqualToSum(table_4_5.forest_2000['total'],
                     [table_4_5.forest_2000['standing'],table_4_5.forest_2000['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.forest',
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
                    `validatorEqualToSum(table_4_5.forest_1990['total'],
                     [table_4_5.forest_1990['standing'],table_4_5.forest_1990['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
                  labelParams: { year: 2020 },
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_2020['total'],
                     [table_4_5.other_wooded_land_2020['standing'],table_4_5.other_wooded_land_2020['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_2015['total'],
                     [table_4_5.other_wooded_land_2015['standing'],table_4_5.other_wooded_land_2015['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_2010['total'],
                     [table_4_5.other_wooded_land_2010['standing'],table_4_5.other_wooded_land_2010['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_2005['total'],
                     [table_4_5.other_wooded_land_2005['standing'],table_4_5.other_wooded_land_2005['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_2000['total'],
                     [table_4_5.other_wooded_land_2000['standing'],table_4_5.other_wooded_land_2000['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.other_wooded_land',
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
                    `validatorEqualToSum(table_4_5.other_wooded_land_1990['total'],
                     [table_4_5.other_wooded_land_1990['standing'],table_4_5.other_wooded_land_1990['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_2020['total'],
                     [table_4_5.total_forest_and_other_wooded_land_2020['standing'],table_4_5.total_forest_and_other_wooded_land_2020['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_2015['total'],
                     [table_4_5.total_forest_and_other_wooded_land_2015['standing'],table_4_5.total_forest_and_other_wooded_land_2015['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_2010['total'],
                     [table_4_5.total_forest_and_other_wooded_land_2010['standing'],table_4_5.total_forest_and_other_wooded_land_2010['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_2005['total'],
                     [table_4_5.total_forest_and_other_wooded_land_2005['standing'],table_4_5.total_forest_and_other_wooded_land_2005['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_2000['total'],
                     [table_4_5.total_forest_and_other_wooded_land_2000['standing'],table_4_5.total_forest_and_other_wooded_land_2000['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_1990['total'],
                     [table_4_5.total_forest_and_other_wooded_land_1990['standing'],table_4_5.total_forest_and_other_wooded_land_1990['lying']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.deadwood.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 4,
                  labelKey: 'panEuropean.deadwood.volumeOfDeadwoodInFOWLBySpeciesGroups',
                  className: 'fra-table__header-cell-left',
                },
              ],
              labelKey: 'panEuropean.deadwood.volumeOfDeadwoodInFOWLBySpeciesGroups',
              colSpan: 4,
              mainCategory: true,
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.coniferous',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(coniferousCols, '2020'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.deadwood.coniferous',
              labelParams: { year: 2020 },
              variableExport: 'coniferous_2020',
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.coniferous',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(coniferousCols, '2015'),
              ],
              labelKey: 'panEuropean.deadwood.coniferous',
              labelParams: { year: 2015 },
              variableExport: 'coniferous_2015',
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.broadleaved',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(broadleavedCols, '2020'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.deadwood.broadleaved',
              labelParams: { year: 2020 },
              variableExport: 'broadleaved_2020',
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.deadwood.broadleaved',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(broadleavedCols, '2015'),
              ],
              labelKey: 'panEuropean.deadwood.broadleaved',
              labelParams: { year: 2015 },
              variableExport: 'broadleaved_2015',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'cubicMeterPerHa',
          columnsExport: ['total', 'standing', 'lying'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.reasonabilityChecks.reasonabilityCheck',
      descriptionKey: 'panEuropean.reasonabilityChecks.description',
      tableSpecs: [
        {
          name: 'reasonability_check_4_5',
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
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_2020.total / table_1_4a.forest_2020.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_2020.total / table_1_4a.other_wooded_land_2020.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_2020.total / table_1_4a.total_forest_and_other_wooded_land_2020.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 2020 },
              variableExport: 'deadwoodVolumeComparedToCarbon_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_2015.total / table_1_4a.forest_2015.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_2015.total / table_1_4a.other_wooded_land_2015.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_2015.total / table_1_4a.total_forest_and_other_wooded_land_2015.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 2015 },
              variableExport: 'deadwoodVolumeComparedToCarbon_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_2010.total / table_1_4a.forest_2010.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_2010.total / table_1_4a.other_wooded_land_2010.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_2010.total / table_1_4a.total_forest_and_other_wooded_land_2010.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 2010 },
              variableExport: 'deadwoodVolumeComparedToCarbon_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_2005.total / table_1_4a.forest_2005.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_2005.total / table_1_4a.other_wooded_land_2005.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_2005.total / table_1_4a.total_forest_and_other_wooded_land_2005.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 2005 },
              variableExport: 'deadwoodVolumeComparedToCarbon_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_2000.total / table_1_4a.forest_2000.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_2000.total / table_1_4a.other_wooded_land_2000.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_2000.total / table_1_4a.total_forest_and_other_wooded_land_2000.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 2000 },
              variableExport: 'deadwoodVolumeComparedToCarbon_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_4_5.forest_1990.total / table_1_4a.forest_1990.deadwood',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn: 'table_4_5.other_wooded_land_1990.total / table_1_4a.other_wooded_land_1990.deadwood',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_4_5.total_forest_and_other_wooded_land_1990.total / table_1_4a.total_forest_and_other_wooded_land_1990.deadwood',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.deadwoodVolumeComparedToCarbon',
              labelParams: { year: 1990 },
              variableExport: 'deadwoodVolumeComparedToCarbon_1990',
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
          name: 'country_comments_4_5_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachAppliedToReportingOnDeadwood',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'pleaseIndicateIfReportedValuesAreAccordingToTheRecommendedMinimumSizes',
              'minimumHeightOfStandingDeadwoodReported',
              'minimumDiameterOfStandingDeadwoodReported',
              'isVolumeAboveGroundOrAboveStump',
              'minimumLengthOfLyingDeadwoodReported',
              'minimumDiameterOfLyingDeadwoodReported',
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
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: { cycles: ['2025'], columnNames: { '2025': ['comment'] } },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_4_5_2',
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
            ...['standingDeadwood', 'lyingDeadwoo'].map((variableName, idx) => ({
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
