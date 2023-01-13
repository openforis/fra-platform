// @ts-nocheck
import { reportYears } from '../reportYears'

export const carbonStock = {
  sectionName: 'carbonStock',
  sectionAnchor: '2d',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'carbonStock',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'carbonStock.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: { '2020': { key: 'fra.categoryHeader2020' } },
                  },
                },
                {
                  idx: 1,
                  colSpan: 9,
                  rowSpan: 1,
                  labelKey: 'carbonStock.tableHeader',
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
                  label: '2016',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2017',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2018',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2019',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  label: '2020',
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
                  labelKey: 'carbonStock.carbonAboveGroundBiomass',
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
              ],
              variableExport: 'carbon_forest_above_ground',
              labelKey: 'carbonStock.carbonAboveGroundBiomass',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'carbonStock.carbonBelowGroundBiomass',
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
              ],
              variableExport: 'carbon_forest_below_ground',
              labelKey: 'carbonStock.carbonBelowGroundBiomass',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'carbonStock.carbonDeadwood',
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
              ],
              variableExport: 'carbon_forest_deadwood',
              labelKey: 'carbonStock.carbonDeadwood',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'carbonStock.carbonLitter',
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
              ],
              variableExport: 'carbon_forest_litter',
              labelKey: 'carbonStock.carbonLitter',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'carbonStock.carbonSoil',
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
              ],
              variableExport: 'carbon_forest_soil',
              labelKey: 'carbonStock.carbonSoil',
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'tonnesPerHa',
          columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
          migration: {
            cycles: ['2020'],
          },
        },
        {
          name: 'carbonStockAvg',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'carbonStock.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: { '2025': { key: 'fra.categoryHeader2025' } },
                  },
                },
                {
                  idx: 1,
                  colSpan: reportYears.length,
                  rowSpan: 1,
                  labelKey: 'carbonStock.tableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: reportYears.map((label, idx) => ({
                idx,
                colSpan: 1,
                rowSpan: 1,
                label,
                className: 'fra-table__header-cell',
                type: 'header',
              })),
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
                  labelKey: 'carbonStock.carbonAboveGroundBiomass',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_above_ground',
              variableName: 'carbon_forest_above_ground',
              labelKey: 'carbonStock.carbonAboveGroundBiomass',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / carbonStockTotal.carbon_forest_above_ground) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
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
                  labelKey: 'carbonStock.carbonBelowGroundBiomass',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_below_ground',
              variableName: 'carbon_forest_below_ground',
              labelKey: 'carbonStock.carbonBelowGroundBiomass',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / carbonStockTotal.carbon_forest_below_ground) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
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
                  labelKey: 'carbonStock.carbonDeadwood',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_deadwood',
              variableName: 'carbon_forest_deadwood',
              labelKey: 'carbonStock.carbonDeadwood',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / carbonStockTotal.carbon_forest_deadwood) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
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
                  labelKey: 'carbonStock.carbonLitter',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_litter',
              variableName: 'carbon_forest_litter',
              labelKey: 'carbonStock.carbonLitter',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / carbonStockTotal.carbon_forest_litter) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
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
                  labelKey: 'carbonStock.carbonSoil',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_soil',
              variableName: 'carbon_forest_soil',
              labelKey: 'carbonStock.carbonSoil',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / carbonStockTotal.carbon_forest_soil) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
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
          unit: 'tonnesPerHa',
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': [...reportYears] },
          },
        },
        {
          name: 'carbonStockTotal',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'carbonStock.categoryHeader',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: { '2025': { key: 'fra.categoryHeader2025' } },
                  },
                },
                {
                  idx: 1,
                  colSpan: reportYears.length,
                  rowSpan: 1,
                  labelKey: 'carbonStock.tableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: { '2025': { key: 'fra.carbonStockTotal.totalForestCarbon' } },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: reportYears.map((label, idx) => ({
                idx,
                colSpan: 1,
                rowSpan: 1,
                label,
                className: 'fra-table__header-cell',
                type: 'header',
              })),
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
                  labelKey: 'carbonStock.carbonAboveGroundBiomass',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_above_ground',
              variableName: 'carbon_forest_above_ground',
              labelKey: 'carbonStock.carbonAboveGroundBiomass',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * carbonStockAvg.carbon_forest_above_ground) / 1000',
                },
                readonly: false,
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
                  labelKey: 'carbonStock.carbonBelowGroundBiomass',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_below_ground',
              variableName: 'carbon_forest_below_ground',
              labelKey: 'carbonStock.carbonBelowGroundBiomass',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * carbonStockAvg.carbon_forest_below_ground) / 1000',
                },
                readonly: false,
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
                  labelKey: 'carbonStock.carbonDeadwood',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_deadwood',
              variableName: 'carbon_forest_deadwood',
              labelKey: 'carbonStock.carbonDeadwood',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * carbonStockAvg.carbon_forest_deadwood) / 1000',
                },
                readonly: false,
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
                  labelKey: 'carbonStock.carbonLitter',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_litter',
              variableName: 'carbon_forest_litter',
              labelKey: 'carbonStock.carbonLitter',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * carbonStockAvg.carbon_forest_litter) / 1000',
                },
                readonly: false,
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
                  labelKey: 'carbonStock.carbonSoil',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              variableExport: 'carbon_forest_soil',
              variableName: 'carbon_forest_soil',
              labelKey: 'carbonStock.carbonSoil',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * carbonStockAvg.carbon_forest_soil) / 1000',
                },
                readonly: false,
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
          unit: 'millionTonnes',
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': [...reportYears] },
          },
        },
        {
          name: 'carbonStockSoilDepth',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'carbonStock.soilDepthHeading',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                },
              ],
              labelKey: 'carbonStock.soilDepthHeading',
              mainCategory: true,
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          secondary: true,
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
