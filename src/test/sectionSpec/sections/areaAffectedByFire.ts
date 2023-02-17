// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const areaAffectedByFire: SectionSpec = {
  sectionName: 'areaAffectedByFire',
  sectionAnchor: '5b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'areaAffectedByFire',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'areaAffectedByFire.categoryHeader',
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
                  colSpan: 18,
                  rowSpan: 1,
                  labelKey: 'areaAffectedByFire.areaUnitLabel',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'areaAffectedByFire.areaUnitLabel' },
                      '2025': { key: 'fra.areaAffectedByFire.areaAffected' },
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
                  labelKey: 'areaAffectedByFire.totalLandAreaAffectedByFire',
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
              labelKey: 'areaAffectedByFire.totalLandAreaAffectedByFire',
              variableExport: 'total_land_area_affected_by_fire',
              migration: {
                validateFns: {
                  '2020': [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, areaAffectedByFire.total_land_area_affected_by_fire)`,
                  ],
                  '2025': [
                    `validatorNotGreaterThanLandArea(extentOfForest.totalLandArea, areaAffectedByFire.total_land_area_affected_by_fire)`,
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
                  labelKey: 'areaAffectedByFire.ofWhichForest',
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
              labelKey: 'areaAffectedByFire.ofWhichForest',
              variableExport: 'of_which_on_forest',
              subcategory: true,
              migration: {
                validateFns: {
                  '2020': [
                    `validatorSubCategory(areaAffectedByFire.total_land_area_affected_by_fire,[areaAffectedByFire.of_which_on_forest])`,
                  ],
                  '2025': [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, areaAffectedByFire.of_which_on_forest)`,
                  ],
                },
                categoryLevel: 1,
              },
            },
            {
              idx: 2,
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
              idx: 3,
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
          columnsExport: [
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
          ],
          unit: 'haThousand',
          migration: {},
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
