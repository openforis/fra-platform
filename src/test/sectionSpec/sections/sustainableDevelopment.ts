// @ts-nocheck

const interpolateForestAreaProportionLandArea = (idx: number) => {
  const variable1 = "extentOfForest.forestArea['2020'] / extentOfForest.totalLandArea['2020'] * 100"
  const variable2 = "extentOfForest.forestArea['2025'] / extentOfForest.totalLandArea['2025'] * 100"
  // check variables exist
  //    and interpolate between
  // else null
  return `(${variable1} > 0 && ${variable2}) > 0 ? (${variable1} + ((${variable2} - ${variable1}) / 5 * ${
    idx + 1
  })) : null`
}

const interpolateAboveGroundBiomass = (idx: number) => {
  const variable1 = "biomassStockAvg.forest_above_ground['2020']"
  const variable2 = "biomassStockAvg.forest_above_ground['2025']"
  // check variables exist
  //    and interpolate between
  // else null
  return `(${variable1} > 0 && ${variable2}) > 0 ? (${variable1} + ((${variable2} - ${variable1}) / 5 * ${
    idx + 1
  })) : null`
}

export const sustainableDevelopment = {
  sectionName: 'sustainableDevelopment',
  sectionAnchor: '8a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_1_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.indicator',
                  labelParams: {},
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'sustainableDevelopment.percent',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 10, rowSpan: 1 },
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
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
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
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((label, idx) => ({
                  idx: idx + 9,
                  colSpan: 1,
                  rowSpan: 1,
                  label,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'forestAreaProportionLandArea2015',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.forestAreaProportionLandArea2015',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'sustainableDevelopment.forestAreaProportionLandArea2015' },
                      '2025': { key: 'fra.sustainableDevelopment.forestAreaProportionLandArea' },
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 0,
                  type: 'decimal',
                  colName: '2000',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2025'],
                  },
                },
                {
                  idx: 1,
                  type: 'decimal',
                  colName: '2005',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2010',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: '2010',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2025'],
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2015',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 3,
                  type: 'decimal',
                  colName: '2015',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2025'],
                  },
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2016',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2017',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2018',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2019',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 8,
                  type: 'calculated',
                  colName: '2020',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2020'],
                  },
                },
                {
                  idx: 8,
                  type: 'decimal',
                  colName: '2020',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',

                    cycles: ['2025'],
                  },
                },
                ...['2021', '2022', '2023', '2024'].map((colName, idx) => ({
                  idx: idx + 9,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: ['2025'],
                    calculateFn: interpolateForestAreaProportionLandArea(idx),
                  },
                })),
                {
                  idx: 14,
                  type: 'decimal',
                  colName: '2025',
                  migration: {
                    calculateFn: 'extentOfForest.forestArea / extentOfForest.totalLandArea * 100',
                    cycles: ['2025'],
                  },
                },
              ],
              labelKey: 'sustainableDevelopment.forestAreaProportionLandArea2015',
            },
          ],
          tableDataRequired: [
            {
              assessmentType: 'fra2020',
              sectionName: 'extentOfForest',
              tableName: 'extentOfForest',
            },
            {
              assessmentType: 'fra2020',
              sectionName: 'biomassStock',
              tableName: 'biomassStock',
            },
            {
              assessmentType: 'fra2020',
              sectionName: 'forestAreaWithinProtectedAreas',
              tableName: 'forestAreaWithinProtectedAreas',
            },
          ],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          migration: {
            columnNames: {
              '2020': ['2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['2000', '2005', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            },
          },
        },
        {
          name: 'sustainableDevelopmentAgencyIndicator',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
          migration: {
            cycles: ['2020'],
          },
        },
      ],
      titleKey: 'sustainableDevelopment.sdgIndicator1',
      migration: {
        label: {
          '2020': { key: 'sustainableDevelopment.sdgIndicator1' },
          '2025': { key: 'fra.sustainableDevelopment.sdgIndicator1_2025' },
        },
      },
    },
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_2_1_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.subIndicator',
                  labelParams: {
                    no: 1,
                  },
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'sustainableDevelopment.percent',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 7, rowSpan: 1 },
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
                  label: '2000-2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010-2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015-2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2016-2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017-2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018-2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019-2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015-2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020-2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 9,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2005-2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 10,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015-2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'forestAreaAnnualNetChangeRate',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.forestAreaAnnualNetChangeRate',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': { key: 'sustainableDevelopment.forestAreaAnnualNetChangeRate' },
                      '2025': { key: 'fra.sustainableDevelopment.annualForestAreaChangeRate' },
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000-2010',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2010"] / extentOfForest.forestArea["2000"]) ** 0.1) - 1) * 100',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2010-2015',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2015"] / extentOfForest.forestArea["2010"]) ** 0.2) - 1) * 100',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2015-2016',
                  migration: {
                    calculateFn:
                      '((extentOfForest.forestArea["2016"] - extentOfForest.forestArea["2015"]) / extentOfForest.forestArea["2016"]) * 100',
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2016-2017',
                  migration: {
                    calculateFn:
                      '((extentOfForest.forestArea["2017"] - extentOfForest.forestArea["2016"]) / extentOfForest.forestArea["2017"]) * 100',
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2017-2018',
                  migration: {
                    calculateFn:
                      '((extentOfForest.forestArea["2018"] - extentOfForest.forestArea["2017"]) / extentOfForest.forestArea["2018"]) * 100',
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2018-2019',
                  migration: {
                    calculateFn:
                      '((extentOfForest.forestArea["2019"] - extentOfForest.forestArea["2018"]) / extentOfForest.forestArea["2019"]) * 100',
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2019-2020',
                  migration: {
                    calculateFn:
                      '((extentOfForest.forestArea["2020"] - extentOfForest.forestArea["2019"]) / extentOfForest.forestArea["2020"]) * 100',
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2015-2020',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2020"] / extentOfForest.forestArea["2015"]) ** 0.2) - 1) * 100',
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 8,
                  type: 'calculated',
                  colName: '2020-2025',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2025"] / extentOfForest.forestArea["2020"]) ** 0.2) - 1) * 100',
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 9,
                  type: 'calculated',
                  colName: '2005-2015',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2015"] / extentOfForest.forestArea["2005"]) ** 0.1) - 1) * 100',
                    cycles: ['2025'],
                  }, // TODO: 2005 ? use_2005() : interpolate_2005()
                },
                {
                  idx: 10,
                  type: 'calculated',
                  colName: '2015-2025',
                  migration: {
                    calculateFn:
                      '(((extentOfForest.forestArea["2025"] / extentOfForest.forestArea["2015"]) ** 0.1) - 1) * 100',
                    cycles: ['2025'],
                  },
                },
              ],
              labelKey: 'sustainableDevelopment.forestAreaAnnualNetChangeRate',
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
              '2020': ['2000-2010', '2010-2015', '2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020'],
              '2025': ['2000-2010', '2010-2015', '2015-2020', '2020-2025', '2005-2015', '2015-2025'],
            },
          },
        },
        {
          name: 'sustainableDevelopmentAgencySubIndicator1',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
          migration: {
            cycles: ['2020'],
          },
        },
      ],
      titleKey: 'sustainableDevelopment.sdgIndicator2',
    },
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_2_1_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.subIndicator',
                  labelParams: {
                    no: 2,
                  },
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'biomassStock.tableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 9, rowSpan: 1 },
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
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((label, idx) => ({
                  idx: idx + 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'aboveGroundBiomassStockForests',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.aboveGroundBiomassStockForests',
                  className: 'fra-table__category-cell',
                },

                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000',
                  migration: {
                    cycles: ['2025'],
                    calculateFn: 'biomassStockAvg.forest_above_ground',
                  },
                },

                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2010',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2010',
                  migration: {
                    cycles: ['2025'],
                    calculateFn: 'biomassStockAvg.forest_above_ground',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2015',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2015',
                  migration: {
                    cycles: ['2025'],
                    calculateFn: 'biomassStockAvg.forest_above_ground',
                  },
                },

                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2016',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2017',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2018',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2019',
                  migration: {
                    cycles: ['2020'],
                    calculateFn: 'biomassStock.forest_above_ground',
                  },
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2020',
                  migration: {
                    cycles: ['2025'],
                    calculateFn: 'biomassStockAvg.forest_above_ground',
                  },
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((colName, idx) => ({
                  idx: idx + 8,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: ['2025'],
                    calculateFn: interpolateAboveGroundBiomass(idx),
                  },
                })),
              ],
              labelKey: 'sustainableDevelopment.aboveGroundBiomassStockForests',
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
              '2020': ['2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            },
          },
        },
        {
          name: 'sustainableDevelopmentAgencySubIndicator2',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            pageBreakAfter: true,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
          migration: {
            cycles: ['2020'],
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_2_1_3',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.subIndicator',
                  labelParams: {
                    no: 3,
                  },
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'sustainableDevelopment.percent2015ForestAreaBaseline',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 10, rowSpan: 1 },
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
                  migration: {
                    cycles: ['2025'],
                  },
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
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((label, idx) => ({
                  idx: idx + 9,
                  colSpan: 1,
                  rowSpan: 1,
                  label,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'proportionForestAreaLegallyEstablishedProtectedAreas',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '1990',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2000',
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2010',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2015',
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2016',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2017',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2018',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2019',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 8,
                  type: 'calculated',
                  colName: '2020',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((colName, idx) => ({
                  idx: idx + 9,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              labelKey: 'sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas',
              migration: {
                calcFormula:
                  'forestAreaWithinProtectedAreas.forest_area_within_protected_areas / extentOfForest.forestArea["2015"] * 100',
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
              '2020': ['2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['1990', '2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            },
          },
        },
        {
          name: 'sustainableDevelopmentAgencySubIndicator3',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
          migration: {
            cycles: ['2020'],
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_2_1_4',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.subIndicator',
                  labelParams: {
                    no: 4,
                  },
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'sustainableDevelopment.percent2015ForestAreaBaseline',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 9, rowSpan: 1 },
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
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((label, idx) => ({
                  idx: idx + 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'proportionForestAreaLongTermForestManagement',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.proportionForestAreaLongTermForestManagement',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000',
                },
                {
                  idx: 1,
                  type: 'calculated',
                  colName: '2010',
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2015',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2016',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2017',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2018',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2019',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2020',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((colName, idx) => ({
                  idx: idx + 8,
                  type: 'decimal',
                  colName,
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              labelKey: 'sustainableDevelopment.proportionForestAreaLongTermForestManagement',
              migration: {
                calcFormula:
                  'Math.min(forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan / extentOfForest.forestArea["2015"] * 100)',
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
              '2020': ['2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': ['2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
            },
          },
        },
        {
          name: 'sustainableDevelopmentAgencySubIndicator4',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'text',
                },
              ],
              labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
          migration: {
            cycles: ['2020'],
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'sustainableDevelopment15_2_1_5',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'sustainableDevelopment.subIndicator',
                  labelParams: {
                    no: 5,
                  },
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'sustainableDevelopment.forestArea1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 26, rowSpan: 1 },
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
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'].map((colName, idx) => ({
                  idx: 1 + idx,
                  colSpan: 1,
                  rowSpan: 1,
                  label: colName,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
                {
                  idx: 10,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2011', '2012', '2013', '2014'].map((colName, idx) => ({
                  idx: 11 + idx,
                  colSpan: 1,
                  rowSpan: 1,
                  label: colName,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
                {
                  idx: 15,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 16,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 17,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 18,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 19,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 20,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((label, idx) => ({
                  idx: idx + 21,
                  colSpan: 1,
                  rowSpan: 1,
                  label,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'forestAreaVerifiedForestManagement',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'sustainableDevelopment.forestAreaVerifiedForestManagement',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: '2000',
                },
                ...['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'].map((colName, idx) => ({
                  idx: idx + 1,
                  type: 'calculated',
                  colName: '2020',
                  migration: {
                    cycles: ['2025'],
                  },
                })),
                {
                  idx: 10,
                  type: 'calculated',
                  colName: '2010',
                },
                ...['2011', '2012', '2013', '2014'].map((colName, idx) => ({
                  idx: idx + 11,
                  type: 'calculated',
                  colName,
                  migration: {
                    cycles: ['2025'],
                  },
                })),
                {
                  idx: 2,
                  type: 'calculated',
                  colName: '2015',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: '2016',
                },
                {
                  idx: 4,
                  type: 'calculated',
                  colName: '2017',
                },
                {
                  idx: 5,
                  type: 'calculated',
                  colName: '2018',
                },
                {
                  idx: 6,
                  type: 'calculated',
                  colName: '2019',
                },
                {
                  idx: 7,
                  type: 'calculated',
                  colName: '2020',
                },
                ...['2021', '2022', '2023', '2024', '2025'].map((colName, idx) => ({
                  idx: idx + 21,
                  type: 'calculated',
                  colName,
                  migration: {
                    cycles: ['2025'],
                  },
                })),
              ],
              labelKey: 'sustainableDevelopment.forestAreaVerifiedForestManagement',
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
              '2020': ['2000', '2010', '2015', '2016', '2017', '2018', '2019', '2020'],
              '2025': [
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
                '2021',
                '2022',
                '2023',
                '2024',
                '2025',
              ],
            },
          },
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: false,
    comments: false,
    introductoryText: false,
    nationalData: false,
  },
  dataExport: {
    included: false,
  },
}
