// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

const validatorDisturbances = (variableName: variable) => {
  const forestArea = 'extentOfForest.forestArea'
  return [
    `validatorNotGreaterThanForest(${forestArea}, disturbances.${variableName})`,
    `validatorSumNotGreaterThan(
      (disturbances.insects || 0) +
      (disturbances.diseases || 0) +
      (disturbances.severe_weather_events || 0) +
      (disturbances.other || 0),
       ${forestArea}
      )`,
  ]
}

export const disturbances: SectionSpec = {
  sectionName: 'disturbances',
  sectionAnchor: '5a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'disturbances',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'disturbances.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'disturbances.categoryHeader' },
                      '2025': { key: 'fra.disturbances.predominantCause' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 18,
                  rowSpan: 1,
                  labelKey: 'disturbances.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'disturbances.areaUnitLabel' },
                      '2025': { key: 'fra.disturbances.forestAreaAffected' },
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
                  label: 2000,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2001,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2002,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2003,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2004,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2005,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2006,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2007,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2008,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 9,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2009,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 10,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2010,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 11,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2011,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 12,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2012,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 13,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2013,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 14,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2014,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 15,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2015,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 16,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2016,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 17,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2017,
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
                  labelKey: 'disturbances.insects',
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
                {
                  idx: 5,
                  type: 'decimal',
                },
                {
                  idx: 6,
                  type: 'decimal',
                },
                {
                  idx: 7,
                  type: 'decimal',
                },
                {
                  idx: 8,
                  type: 'decimal',
                },
                {
                  idx: 9,
                  type: 'decimal',
                },
                {
                  idx: 10,
                  type: 'decimal',
                },
                {
                  idx: 11,
                  type: 'decimal',
                },
                {
                  idx: 12,
                  type: 'decimal',
                },
                {
                  idx: 13,
                  type: 'decimal',
                },
                {
                  idx: 14,
                  type: 'decimal',
                },
                {
                  idx: 15,
                  type: 'decimal',
                },
                {
                  idx: 16,
                  type: 'decimal',
                },
                {
                  idx: 17,
                  type: 'decimal',
                },
              ],
              labelKey: 'disturbances.insects',
              variableNo: 'a',
              variableExport: 'insects',
              migration: {
                validateFns: validatorDisturbances('insects'),
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
                  labelKey: 'disturbances.diseases',
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
                {
                  idx: 5,
                  type: 'decimal',
                },
                {
                  idx: 6,
                  type: 'decimal',
                },
                {
                  idx: 7,
                  type: 'decimal',
                },
                {
                  idx: 8,
                  type: 'decimal',
                },
                {
                  idx: 9,
                  type: 'decimal',
                },
                {
                  idx: 10,
                  type: 'decimal',
                },
                {
                  idx: 11,
                  type: 'decimal',
                },
                {
                  idx: 12,
                  type: 'decimal',
                },
                {
                  idx: 13,
                  type: 'decimal',
                },
                {
                  idx: 14,
                  type: 'decimal',
                },
                {
                  idx: 15,
                  type: 'decimal',
                },
                {
                  idx: 16,
                  type: 'decimal',
                },
                {
                  idx: 17,
                  type: 'decimal',
                },
              ],
              labelKey: 'disturbances.diseases',
              variableNo: 'b',
              variableExport: 'diseases',
              migration: {
                validateFns: validatorDisturbances('diseases'),
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
                  labelKey: 'disturbances.severeWeatherEvents',
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
                {
                  idx: 5,
                  type: 'decimal',
                },
                {
                  idx: 6,
                  type: 'decimal',
                },
                {
                  idx: 7,
                  type: 'decimal',
                },
                {
                  idx: 8,
                  type: 'decimal',
                },
                {
                  idx: 9,
                  type: 'decimal',
                },
                {
                  idx: 10,
                  type: 'decimal',
                },
                {
                  idx: 11,
                  type: 'decimal',
                },
                {
                  idx: 12,
                  type: 'decimal',
                },
                {
                  idx: 13,
                  type: 'decimal',
                },
                {
                  idx: 14,
                  type: 'decimal',
                },
                {
                  idx: 15,
                  type: 'decimal',
                },
                {
                  idx: 16,
                  type: 'decimal',
                },
                {
                  idx: 17,
                  type: 'decimal',
                },
              ],
              labelKey: 'disturbances.severeWeatherEvents',
              variableNo: 'c',
              variableExport: 'severe_weather_events',
              migration: {
                validateFns: validatorDisturbances('severe_weather_events'),
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
                  labelKey: 'disturbances.other',
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
                {
                  idx: 5,
                  type: 'decimal',
                },
                {
                  idx: 6,
                  type: 'decimal',
                },
                {
                  idx: 7,
                  type: 'decimal',
                },
                {
                  idx: 8,
                  type: 'decimal',
                },
                {
                  idx: 9,
                  type: 'decimal',
                },
                {
                  idx: 10,
                  type: 'decimal',
                },
                {
                  idx: 11,
                  type: 'decimal',
                },
                {
                  idx: 12,
                  type: 'decimal',
                },
                {
                  idx: 13,
                  type: 'decimal',
                },
                {
                  idx: 14,
                  type: 'decimal',
                },
                {
                  idx: 15,
                  type: 'decimal',
                },
                {
                  idx: 16,
                  type: 'decimal',
                },
                {
                  idx: 17,
                  type: 'decimal',
                },
              ],
              labelKey: 'disturbances.other',
              variableNo: 'd',
              variableExport: 'other',
              migration: {
                validateFns: validatorDisturbances('other'),
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
                  labelKey: 'disturbances.total',
                  variableNo: 'a+b+c+d',
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
                {
                  idx: 5,
                  type: 'calculated',
                },
                {
                  idx: 6,
                  type: 'calculated',
                },
                {
                  idx: 7,
                  type: 'calculated',
                },
                {
                  idx: 8,
                  type: 'calculated',
                },
                {
                  idx: 9,
                  type: 'calculated',
                },
                {
                  idx: 10,
                  type: 'calculated',
                },
                {
                  idx: 11,
                  type: 'calculated',
                },
                {
                  idx: 12,
                  type: 'calculated',
                },
                {
                  idx: 13,
                  type: 'calculated',
                },
                {
                  idx: 14,
                  type: 'calculated',
                },
                {
                  idx: 15,
                  type: 'calculated',
                },
                {
                  idx: 16,
                  type: 'calculated',
                },
                {
                  idx: 17,
                  type: 'calculated',
                },
              ],
              labelKey: 'disturbances.total',
              variableExport: 'total',
              variableNo: 'a+b+c+d',
              mainCategory: true,
              variableName: 'total',
              migration: {
                cycles: ['2020'],
                colNames: [
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
                ],
                calcFormula: `(disturbances.insects || disturbances.diseases  || disturbances.severe_weather_events  || disturbances.other) 
                    ? (
                      (disturbances.insects || 0) + (disturbances.diseases || 0) + (disturbances.severe_weather_events || 0) + (disturbances.other || 0)
                    ) : null`,
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea, (disturbances.insects || 0) + (disturbances.diseases || 0) + (disturbances.severe_weather_events || 0) + (disturbances.other || 0))`,
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
                  labelKey: 'disturbances.totalForestArea',
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
                {
                  idx: 4,
                  type: 'calculated',
                },
                {
                  idx: 5,
                  type: 'calculated',
                },
                {
                  idx: 6,
                  type: 'calculated',
                },
                {
                  idx: 7,
                  type: 'calculated',
                },
                {
                  idx: 8,
                  type: 'calculated',
                },
                {
                  idx: 9,
                  type: 'calculated',
                },
                {
                  idx: 10,
                  type: 'calculated',
                },
                {
                  idx: 11,
                  type: 'calculated',
                },
                {
                  idx: 12,
                  type: 'calculated',
                },
                {
                  idx: 13,
                  type: 'calculated',
                },
                {
                  idx: 14,
                  type: 'calculated',
                },
                {
                  idx: 15,
                  type: 'calculated',
                },
                {
                  idx: 16,
                  type: 'calculated',
                },
                {
                  idx: 17,
                  type: 'calculated',
                },
              ],
              labelKey: 'disturbances.totalForestArea',
              linkToSection: 'extentOfForest',
              variableName: 'totalForestArea',
              migration: {
                cycles: ['2020'],
                colNames: [
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
                ],
                calcFormula: 'extentOfForest.forestArea',
              },
            },
            {
              idx: 6,
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
              idx: 7,
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
          columnsExport: [
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
          ],
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
    label: {
      '2020': { key: 'disturbances.disturbances' },
      '2025': { key: 'fra.disturbances.forestDamage' },
    },
  },
}
