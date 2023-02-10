// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const areaOfPermanentForestEstate: SectionSpec = {
  sectionName: 'areaOfPermanentForestEstate',
  sectionAnchor: '6b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'areaOfPermanentForestEstate',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'areaOfPermanentForestEstate.categoryHeader',
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
                  colSpan: 6,
                  rowSpan: 1,
                  labelKey: 'areaOfPermanentForestEstate.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: { '2025': { colSpan: 7 } },
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
                  labelKey: 'areaOfPermanentForestEstate.applicable',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
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
                  labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'select',
                  options: [
                    {
                      optionName: 'yes',
                    },
                    {
                      optionName: 'no',
                    },
                  ],
                  optionsLabelKeyPrefix: 'yesNoTextSelect',
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
                  colName: '2025',
                  migration: {
                    cycles: ['2025'],
                  },
                },
              ],
              labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
              variableExport: 'area_of_permanent_forest_estate',
              migration: {
                validateFns: [
                  `validatorNotGreaterThanForest(extentOfForest.forestArea,areaOfPermanentForestEstate.area_of_permanent_forest_estate)`,
                ],
              },
            },
            {
              idx: 1,
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
              idx: 2,
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
          unit: 'haThousand',
          columnsExport: [1990, 2000, 2010, 2015, 2020],
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: false,
    comments: true,
    introductoryText: false,
    nationalData: true,
  },
  dataExport: {
    included: true,
  },
}
