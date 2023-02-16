// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const contactPersons: SectionSpec = {
  sectionName: 'contactPersons',
  sectionAnchor: '',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'contactPersons',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'common.year',
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
                  labelKey: 'fra.contactPersons.expectedYearForNextCountryReportUpdate',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'text',
                  colName: 'expectedYearForNextCountryReportUpdate',
                },
              ],
              labelKey: 'contactPersons.expectedYearForNextCountryReportUpdate',
              variableName: 'expectedYearForNextCountryReportUpdate',
              migration: {
                validateFns: [`validatorNextCountryReportYear(contactPersons.expectedYearForNextCountryReportUpdate)`],
              },
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: false,
          columnsExportAlways: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['year'] },
          },
        },
      ],
    },
  ],
  showTitle: false,
  descriptions: {
    analysisAndProcessing: false,
    comments: false,
    introductoryText: true,
    nationalData: false,
  },
  dataExport: {
    included: false,
  },
}
