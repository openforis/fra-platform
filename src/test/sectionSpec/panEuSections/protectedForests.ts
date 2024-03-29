// @ts-nocheck
import { updatedDataCol } from '../panEuHelpers/updatedDataCol'

const totalForestCols = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_9.total_forest_and_other_wooded_land_yearPlaceholder['mcpfe_class_1_1'],
                     [table_4_9.forest_yearPlaceholder['mcpfe_class_1_1'],table_4_9.other_wooded_land_yearPlaceholder['mcpfe_class_1_1']])`,
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
          `validatorEqualToSum(table_4_9.total_forest_and_other_wooded_land_yearPlaceholder['mcpfe_class_1_2'],
                     [table_4_9.forest_yearPlaceholder['mcpfe_class_1_2'],table_4_9.other_wooded_land_yearPlaceholder['mcpfe_class_1_2']])`,
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
          `validatorEqualToSum(table_4_9.total_forest_and_other_wooded_land_yearPlaceholder['mcpfe_class_1_3'],
                     [table_4_9.forest_yearPlaceholder['mcpfe_class_1_3'],table_4_9.other_wooded_land_yearPlaceholder['mcpfe_class_1_3']])`,
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
          `validatorEqualToSum(table_4_9.total_forest_and_other_wooded_land_yearPlaceholder['mcpfe_class_2'],
                     [table_4_9.forest_yearPlaceholder['mcpfe_class_2'],table_4_9.other_wooded_land_yearPlaceholder['mcpfe_class_2']])`,
        ],
      },
    },
  },
]

export const protectedForests = {
  sectionName: 'protectedForests',
  sectionAnchor: '4.9',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_4_9',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.protectedForests.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey: 'panEuropean.protectedForests.ha1000',
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
                  labelKey: 'panEuropean.protectedForests.mcpfe_class_1_1',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.protectedForests.mcpfe_class_1_2',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.protectedForests.mcpfe_class_1_3',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.protectedForests.mcpfe_class_2',
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
                  labelKey: 'panEuropean.protectedForests.forest',
                  labelParams: { year: 2025 },
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
              },
              labelKey: 'panEuropean.protectedForests.forest',
              labelParams: { year: 2025 },
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.forest',
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
              labelKey: 'panEuropean.protectedForests.forest',
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
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
                  labelParams: { year: 2025 },
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
              },
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'other_wooded_land_2025',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.other_wooded_land',
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
              labelKey: 'panEuropean.protectedForests.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },

            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2025'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'total_forest_and_other_wooded_land_2025',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2020'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2015'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2010'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2005'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '2000'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestCols, '1990'),
              ],
              labelKey: 'panEuropean.protectedForests.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: ['mcpfe_class_1_1', 'mcpfe_class_1_2', 'mcpfe_class_1_3', 'mcpfe_class_2'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_4_9_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.theYearAndDataReportedFor2025',
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
                  labelKey: 'panEuropean.countryComments.howDidYouGenerateValuesFor2025',
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
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            ...['extrapolation', 'assessmentBasedOnEvidence'].map((variableName, idx) => ({
              idx: idx + 1,
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
          name: 'country_comments_4_9_2',
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
              'forEachClassPleaseProvideAnExplanationIfAndHowYouClassifiedNatura2000AreasInYourReporting',
              'fowlMcpfeClass11',
              'fowlMcpfeClass12',
              'fowlMcpfeClass13',
              'fowlMcpfeClass2',
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
