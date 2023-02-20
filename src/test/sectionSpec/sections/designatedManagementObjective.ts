// @ts-nocheck
import { reportYears } from '../reportYears'
import { SectionSpec } from '../sectionSpec'

const colsData2025 = reportYears.map((colName, idx) => ({
  idx,
  colName,
  type: 'decimal',
  ...(colName === '2025' ? { migration: { cycles: ['2025'] } } : {}),
}))
const colsCalculated2025 = colsData2025.map((c) => ({ ...c, type: 'calculated' }))

const colsData2020 = colsData2025.filter((c) => c.colName !== '2025')
const colsCalculated2020 = colsData2020.map((c) => ({ ...c, type: 'calculated' }))

export const designatedManagementObjective: SectionSpec = {
  sectionName: 'designatedManagementObjective',
  sectionAnchor: '3a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'primaryDesignatedManagementObjective',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'designatedManagementObjective.categoryHeader',
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
                  labelKey: 'designatedManagementObjective.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 5, rowSpan: 1 },
                      '2025': { colSpan: 6, rowSpan: 1 },
                    },
                  },
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
                  label: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
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
                  labelKey: 'designatedManagementObjective.production',
                  variableNo: 'a',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.production',
              variableNo: 'a',
              variableExport: 'production',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.production)`,
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
                  labelKey: 'designatedManagementObjective.soilWaterProtection',
                  variableNo: 'b',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.soilWaterProtection',
              variableNo: 'b',
              variableExport: 'protection_of_soil_and_water',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.protection_of_soil_and_water)`,
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
                  labelKey: 'designatedManagementObjective.biodiversityConservation',
                  variableNo: 'c',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.biodiversityConservation',
              variableNo: 'c',
              variableExport: 'conservation_of_biodiversity',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.conservation_of_biodiversity)`,
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
                  labelKey: 'designatedManagementObjective.socialServices',
                  variableNo: 'd',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.socialServices',
              variableNo: 'd',
              variableExport: 'social_services',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.social_services)`,
                ],
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
                  labelKey: 'designatedManagementObjective.multipleUse',
                  variableNo: 'e',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.multipleUse',
              variableNo: 'e',
              variableExport: 'multiple_use',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.multiple_use)`,
                ],
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
                  labelKey: 'designatedManagementObjective.other',
                  variableNo: 'f',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.other',
              variableNo: 'f',
              variableExport: 'other',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, primaryDesignatedManagementObjective.other)`,
                ],
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
                  labelKey: 'designatedManagementObjective.unknown',
                  variableNo: 'g',
                  className: 'fra-table__category-cell',
                },
                ...colsCalculated2020,
              ],
              labelKey: 'designatedManagementObjective.unknown',
              variableExport: 'no_unknown',
              variableNo: 'g',
              variableName: 'no_unknown',
              migration: {
                cycles: ['2020'],
                validateFns: [`validatorGreaterThanOrZero(primaryDesignatedManagementObjective.no_unknown)`],
                calcFormula: `extentOfForest.forestArea
                    ? extentOfForest.forestArea - (primaryDesignatedManagementObjective.production || 0) - (primaryDesignatedManagementObjective.protection_of_soil_and_water || 0) - (primaryDesignatedManagementObjective.conservation_of_biodiversity || 0) - (primaryDesignatedManagementObjective.social_services || 0) - (primaryDesignatedManagementObjective.multiple_use || 0) - (primaryDesignatedManagementObjective.other || 0)
                    : null`,
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
                  labelKey: 'fra.designatedManagementObjective.noDesignation',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'fra.designatedManagementObjective.noDesignation',
              variableExport: 'no_designation',
              variableName: 'no_designation',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
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
                  labelKey: 'fra.designatedManagementObjective.unknown2025',
                  className: 'fra-table__category-cell',
                },
                ...colsCalculated2025,
              ],
              labelKey: 'fra.designatedManagementObjective.unknown2025',
              variableExport: 'unknown',
              variableName: 'unknown',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
                validateFns: [`validatorGreaterThanOrZero(primaryDesignatedManagementObjective.unknown)`],
                calcFormula: `extentOfForest.forestArea
                    ? Math.max(0, extentOfForest.forestArea - (primaryDesignatedManagementObjective.production || 0) - (primaryDesignatedManagementObjective.protection_of_soil_and_water || 0) - (primaryDesignatedManagementObjective.conservation_of_biodiversity || 0) - (primaryDesignatedManagementObjective.social_services || 0) - (primaryDesignatedManagementObjective.multiple_use || 0) - (primaryDesignatedManagementObjective.other || 0) - (primaryDesignatedManagementObjective.no_designation || 0))
                    : null`,
              },
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'designatedManagementObjective.totalForestArea',
                  linkToSection: 'extentOfForest',
                  className: 'fra-table__category-cell',
                },
                ...colsCalculated2025,
              ],
              labelKey: 'designatedManagementObjective.totalForestArea',
              linkToSection: 'extentOfForest',
              variableName: 'totalForestArea',
              migration: {
                colNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
                calcFormula: 'extentOfForest.forestArea',
                validateFns: [
                  `validatorSumNotGreaterThanForest(extentOfForest.forestArea, (primaryDesignatedManagementObjective.production || 0) + (primaryDesignatedManagementObjective.protection_of_soil_and_water || 0) + (primaryDesignatedManagementObjective.conservation_of_biodiversity || 0) + (primaryDesignatedManagementObjective.social_services || 0) + (primaryDesignatedManagementObjective.multiple_use || 0) + (primaryDesignatedManagementObjective.other || 0) + (primaryDesignatedManagementObjective.no_designation || 0) + (primaryDesignatedManagementObjective.unknown || 0))`,
                ],
              },
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
          migration: {
            columnNames: {
              '2020': colsData2020.map((c) => c.colName),
              '2025': colsData2025.map((c) => c.colName),
            },
          },
        },
      ],
      titleKey: 'designatedManagementObjective.primaryDesignatedManagementObjective',
      descriptionKey: 'designatedManagementObjective.primaryDesignatedManagementObjectiveSupport',
    },
    {
      tableSpecs: [
        {
          name: 'totalAreaWithDesignatedManagementObjective',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'designatedManagementObjective.categoryHeader',
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
                  labelKey: 'designatedManagementObjective.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 5, rowSpan: 1 },
                      '2025': { colSpan: 6, rowSpan: 1 },
                    },
                  },
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
                  label: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
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
                  labelKey: 'designatedManagementObjective.production',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.production',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, totalAreaWithDesignatedManagementObjective.production)`,
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
                  labelKey: 'designatedManagementObjective.soilWaterProtection',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.soilWaterProtection',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, totalAreaWithDesignatedManagementObjective.protection_of_soil_and_water)`,
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
                  labelKey: 'designatedManagementObjective.biodiversityConservation',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.biodiversityConservation',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, totalAreaWithDesignatedManagementObjective.conservation_of_biodiversity)`,
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
                  labelKey: 'designatedManagementObjective.socialServices',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.socialServices',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, totalAreaWithDesignatedManagementObjective.social_services)`,
                ],
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
                  labelKey: 'designatedManagementObjective.other',
                  className: 'fra-table__category-cell',
                },
                ...colsData2025,
              ],
              labelKey: 'designatedManagementObjective.other',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, totalAreaWithDesignatedManagementObjective.other)`,
                ],
              },
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          migration: {
            columnNames: {
              '2020': colsData2020.map((c) => c.colName),
              '2025': colsData2025.map((c) => c.colName),
            },
          },
        },
      ],
      titleKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjective',
      descriptionKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport',
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
