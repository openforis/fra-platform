// @ts-nocheck
import { updatedDataCol } from '../panEuHelpers/updatedDataCol'

const totalForestAndOtherCols = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_5_1.total_forest_and_other_wooded_land_yearPlaceholder['total'],
            [table_5_1.forest_yearPlaceholder['total'],table_5_1.other_wooded_land_yearPlaceholder['total']])`,
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
          `validatorEqualToSum(table_5_1.total_forest_and_other_wooded_land_yearPlaceholder['soil_water_and_other_forest_ecosystem_functions'],
            [table_5_1.forest_yearPlaceholder['soil_water_and_other_forest_ecosystem_functions'],table_5_1.other_wooded_land_yearPlaceholder['soil_water_and_other_forest_ecosystem_functions']])`,
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
          `validatorEqualToSum(table_5_1.total_forest_and_other_wooded_land_yearPlaceholder['infrastructure_and_managed_natural_resources'],
            [table_5_1.forest_yearPlaceholder['infrastructure_and_managed_natural_resources'],table_5_1.other_wooded_land_yearPlaceholder['infrastructure_and_managed_natural_resources']])`,
        ],
      },
    },
  },
]

export const protectiveForestsSoilWaterAndOtherEcosystemFunctions = {
  sectionName: 'protectiveForestsSoilWaterAndOtherEcosystemFunctions',
  sectionAnchor: '5.1',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_5_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.protectiveForestsMCPFEClass31000ha',
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
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.soil_water_and_other_forest_ecosystem_functions',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.infrastructure_and_managed_natural_resources',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2025['total'],
                     [table_5_1.forest_2025['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2025['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2020['total'],
                     [table_5_1.forest_2020['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2020['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2015['total'],
                     [table_5_1.forest_2015['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2015['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2010['total'],
                     [table_5_1.forest_2010['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2010['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2005['total'],
                     [table_5_1.forest_2005['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2005['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_2000['total'],
                     [table_5_1.forest_2000['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_2000['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                    `validatorEqualToSum(table_5_1.forest_1990['total'],
                     [table_5_1.forest_1990['infrastructure_and_managed_natural_resources'],
                     table_5_1.forest_1990['soil_water_and_other_forest_ecosystem_functions']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.forest',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2025'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2020'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2015'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2010'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2005'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '2000'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
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
                  labelKey:
                    'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataCol(totalForestAndOtherCols, '1990'),
              ],
              labelKey:
                'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'soil_water_and_other_forest_ecosystem_functions',
            'infrastructure_and_managed_natural_resources',
            'total',
          ],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_5_1_1',
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
          name: 'country_comments_5_1_2',
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
              'ForEachClassPleaseProvideAnExplanationHowDidYouDesignateThoseAreasEGLegalBasedDesignationManagementPlansOtherDesignationTypesEGSurveySlopeGradientEtHowDidYouClassifiedNatura2000AreasInYourReporting',
              'soilWaterAndOtherForestEcosystemFunctions',
              'infrastructureAndManagedNaturalResources',
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
