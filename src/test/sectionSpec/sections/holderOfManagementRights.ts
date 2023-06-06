// @ts-nocheck

import { SectionSpec } from 'test/sectionSpec'

export const holderOfManagementRights: SectionSpec = {
  sectionName: 'holderOfManagementRights',
  sectionAnchor: '4b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'holderOfManagementRights',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'holderOfManagementRights.categoryHeader',
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
                  labelKey: 'holderOfManagementRights.areaUnitLabel',
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
                  labelKey: 'holderOfManagementRights.publicAdministration',
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
              ],
              labelKey: 'holderOfManagementRights.publicAdministration',
              variableExport: 'public_administration',
              variableNo: 'a',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'holderOfManagementRights.individuals',
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
              labelKey: 'holderOfManagementRights.individuals',
              variableExport: 'individuals',
              variableNo: 'b',
              migration: {
                cycles: ['2020'],
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
                  labelKey: 'holderOfManagementRights.privateBusinesses',
                  variableNo: 'c',
                  className: 'fra-table__category-cell',
                  migration: {
                    variableNo: {
                      '2020': 'c',
                      '2025': 'b',
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
              labelKey: 'holderOfManagementRights.privateBusinesses',
              variableExport: 'private_businesses',
              variableNo: 'c',
              migration: {
                variableNo: {
                  '2020': 'c',
                  '2025': 'b',
                },
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
                  labelKey: 'holderOfManagementRights.communities',
                  variableNo: 'd',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'holderOfManagementRights.communities' },
                      '2025': { key: 'fra.holderOfManagementRights.communities2025' },
                    },
                    variableNo: {
                      '2020': 'd',
                      '2025': 'c',
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
              labelKey: 'holderOfManagementRights.communities',
              variableExport: 'communities',
              variableNo: 'd',
              migration: {
                labelKey: {
                  '2020': 'holderOfManagementRights.communities',
                  '2025': 'fra.holderOfManagementRights.communities2025',
                },
                variableNo: {
                  '2020': 'd',
                  '2025': 'c',
                },
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
                  labelKey: 'holderOfManagementRights.other',
                  variableNo: 'e',
                  className: 'fra-table__category-cell',
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
              ],
              labelKey: 'holderOfManagementRights.other',
              variableExport: 'other_or_unknown',
              variableNo: 'e',
              variableName: 'other',
              migration: {
                cycles: ['2020'],
                colNames: ['1990', '2000', '2010', '2015'],
                validateFns: [`validatorGreaterThanOrZero(holderOfManagementRights.other)`],
                calcFormula:
                  'forestOwnership.public_ownership - (holderOfManagementRights.public_administration || 0) - (holderOfManagementRights.individuals || 0) - (holderOfManagementRights.private_businesses || 0) - (holderOfManagementRights.communities || 0)',
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
                  labelKey: 'fra.holderOfManagementRights.other2025',
                  variableNo: 'd',
                  className: 'fra-table__category-cell',
                  migration: {
                    cycles: ['2025'],
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
              labelKey: 'fra.holderOfManagementRights.other2025',
              variableExport: 'other',
              variableNo: 'd',
              variableName: 'other2025',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020'],
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
                  labelKey: 'fra.holderOfManagementRights.unknown2025',
                  variableNo: 'e',
                  className: 'fra-table__category-cell',
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
              ],
              labelKey: 'fra.holderOfManagementRights.unknown2025',
              variableExport: 'unknown',
              variableNo: 'e',
              variableName: 'unknown',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                validateFns: [`validatorGreaterThanOrZero(holderOfManagementRights.unknown)`],
                calcFormula:
                  'forestOwnership.public_ownership - (holderOfManagementRights.public_administration || 0) - (holderOfManagementRights.private_businesses || 0) - (holderOfManagementRights.communities || 0) -  (holderOfManagementRights.other2025 || 0)',
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
                  labelKey: 'holderOfManagementRights.totalPublicOwnership',
                  linkToSection: 'forestOwnership',
                  className: 'fra-table__category-cell',
                  migration: {
                    variableNo: { '2025': 'a+b+c+d+e' },
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
              ],
              labelKey: 'holderOfManagementRights.totalPublicOwnership',
              linkToSection: 'forestOwnership',
              variableName: 'totalPublicOwnership',
              migration: {
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                calcFormula: { '2025': 'forestOwnership.public_ownership', '2020': 'forestOwnership.public_ownership' },
              },
            },
          ],
          tableDataRequired: [
            {
              assessmentType: 'fra2020',
              sectionName: 'forestOwnership',
              tableName: 'forestOwnership',
            },
          ],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [1990, 2000, 2010, 2015],
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
}
