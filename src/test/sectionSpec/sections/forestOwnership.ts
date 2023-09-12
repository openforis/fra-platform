// @ts-nocheck

export const forestOwnership = {
  sectionName: 'forestOwnership',
  sectionAnchor: '4a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'forestOwnership',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'forestOwnership.categoryHeader',
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
                  labelKey: 'forestOwnership.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
              migration: {
                label: {
                  '2020': { key: 'fra.categoryHeader2020' },
                  '2025': { key: 'fra.categoryHeader2025' },
                },
              },
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
                  labelKey: 'forestOwnership.privateOwnership',
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
              labelKey: 'forestOwnership.privateOwnership',
              variableExport: 'private_ownership',
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
                  labelKey: 'forestOwnership.ofWhichIndividuals',
                  className: 'fra-table__subcategory-cell',
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
              labelKey: 'forestOwnership.ofWhichIndividuals',
              variableExport: 'of_which_by_individuals',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorPrivateOwnership(forestOwnership.private_ownership,[forestOwnership.of_which_by_individuals,forestOwnership.of_which_by_private_businesses,forestOwnership.of_which_by_communities])`,
                  `validatorNotGreaterThan(forestOwnership.of_which_by_individuals, forestOwnership.private_ownership)`,
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
                  labelKey: 'forestOwnership.ofWhichPrivateBusinesses',
                  className: 'fra-table__subcategory-cell',
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
              labelKey: 'forestOwnership.ofWhichPrivateBusinesses',
              variableExport: 'of_which_by_private_businesses',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorPrivateOwnership(forestOwnership.private_ownership,[forestOwnership.of_which_by_individuals,forestOwnership.of_which_by_private_businesses,forestOwnership.of_which_by_communities])`,
                  `validatorNotGreaterThan(forestOwnership.of_which_by_private_businesses, forestOwnership.private_ownership)`,
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
                  labelKey: 'forestOwnership.ofWhichCommunities',
                  className: 'fra-table__subcategory-cell',
                  migration: {
                    label: {
                      '2020': { key: 'forestOwnership.ofWhichCommunities' },
                      '2025': { key: 'fra.forestOwnership.ofWhichCommunities2025' },
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
              labelKey: 'forestOwnership.ofWhichCommunities',
              variableExport: 'of_which_by_communities',
              subcategory: true,
              migration: {
                validateFns: [
                  `validatorPrivateOwnership(forestOwnership.private_ownership,[forestOwnership.of_which_by_individuals,forestOwnership.of_which_by_private_businesses,forestOwnership.of_which_by_communities])`,
                  `validatorNotGreaterThan(forestOwnership.of_which_by_communities, forestOwnership.private_ownership)`,
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
                  labelKey: 'forestOwnership.publicOwnership',
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
              labelKey: 'forestOwnership.publicOwnership',
              variableExport: 'public_ownership',
              variableNo: 'b',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'forestOwnership.otherOrUnknown',
                  variableNo: 'c',
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
              labelKey: 'forestOwnership.otherOrUnknown',
              variableExport: 'other_or_unknown',
              variableNo: 'c',
              variableName: 'other_or_unknown',
              migration: {
                cycles: ['2020'],
                colNames: ['1990', '2000', '2010', '2015'],
                calcFormula: `forestOwnership.private_ownership || forestOwnership.public_ownership 
                    ? extentOfForest.forestArea - (forestOwnership.private_ownership || 0) - (forestOwnership.public_ownership || 0)
                    : null`,
                validateFns: [`validatorGreaterThanOrZero(forestOwnership.other_or_unknown)`],
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
                  labelKey: 'fra.forestOwnership.other2025',
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
              ],
              labelKey: 'fra.forestOwnership.other2025',
              variableExport: 'other',
              variableNo: 'c',
              variableName: 'other',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020'],
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
                  labelKey: 'fra.forestOwnership.unknown2025',
                  variableNo: 'd',
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
              labelKey: 'fra.forestOwnership.unknown2025',
              variableExport: 'unknown',
              variableNo: 'd',
              variableName: 'unknown',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                calcFormula: `forestOwnership.private_ownership || forestOwnership.public_ownership
                    ? Math.max(0, (extentOfForest.forestArea - (forestOwnership.private_ownership || 0) - (forestOwnership.public_ownership || 0) - (forestOwnership.other || 0)))
                    : null`,
                validateFns: [`validatorGreaterThanOrZero(forestOwnership.unknown)`],
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
                  labelKey: 'forestOwnership.totalForestArea',
                  linkToSection: 'extentOfForest',
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
              labelKey: 'forestOwnership.totalForestArea',
              linkToSection: 'extentOfForest',
              variableName: 'totalForestArea',
              migration: {
                cycles: ['2020'],
                colNames: ['1990', '2000', '2010', '2015'],
                calcFormula: 'extentOfForest.forestArea',
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
                  labelKey: 'fra.forestOwnership.total2025',
                  className: 'fra-table__category-cell',
                  variableNo: 'a+b+c+d',
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
              labelKey: 'fra.forestOwnership.total2025',
              variableName: 'total',
              migration: {
                cycles: ['2025'],
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                calcFormula:
                  '(forestOwnership.private_ownership || forestOwnership.public_ownership || forestOwnership.other || forestOwnership.unknown)' +
                  ' ? (forestOwnership.private_ownership || 0) + (forestOwnership.public_ownership || 0) + (forestOwnership.other || 0) + (forestOwnership.unknown || 0)' +
                  ' : null',
                validateFns: [`validatorNotGreaterThanForest(extentOfForest.forestArea, forestOwnership.total)`],
              },
            },
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
