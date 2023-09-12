// @ts-nocheck
import { reportYears } from '../reportYears'
import { SectionSpec } from '../sectionSpec'
import { getStatusAndTierTable } from './common/statusAndTierTable'

export const biomassStock: SectionSpec = {
  sectionName: 'biomassStock',
  sectionAnchor: '2c',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'biomassStock',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'biomassStock.categoryHeader',
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
                  labelKey: 'biomassStock.tableHeader',
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
                  labelKey: 'biomassStock.aboveGround',
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
              labelKey: 'biomassStock.aboveGround',
              variableExport: 'forest_above_ground',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'biomassStock.belowGround',
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
              labelKey: 'biomassStock.belowGround',
              variableExport: 'forest_below_ground',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'biomassStock.deadWood',
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
              labelKey: 'biomassStock.deadWood',
              variableExport: 'forest_deadwood',
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
          name: 'biomassStockAvg',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'biomassStock.categoryHeader',
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
                  labelKey: 'biomassStock.tableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: { '2025': { key: 'fra.biomassStockAvg.forestBiomass' } },
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
                  labelKey: 'biomassStock.aboveGround',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.aboveGround',
              variableName: 'forest_above_ground',
              variableExport: 'forest_above_ground',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / biomassStockTotal.forest_above_ground) * 1000',
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
                  labelKey: 'biomassStock.belowGround',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.belowGround',
              variableName: 'forest_below_ground',
              variableExport: 'forest_below_ground',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / biomassStockTotal.forest_below_ground) * 1000',
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
                  labelKey: 'biomassStock.deadWood',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.deadWood',
              variableName: 'forest_deadwood',
              variableExport: 'forest_deadwood',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea / biomassStockTotal.forest_deadwood) * 1000',
                },
                readonly: false,
                dependantsExclude: [{ tableName: 'extentOfForest', variableName: 'forestArea' }],
              },
            },
          ],
          columnsExportAlways: [],
          dataExport: true,
          unit: 'tonnesPerHa',
          migration: {
            cycles: ['2025'],
            columnNames: {
              '2025': [...reportYears],
            },
          },
        },
        {
          name: 'biomassStockTotal',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'biomassStock.categoryHeader',
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
                  labelKey: 'biomassStock.tableHeader',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: { '2025': { key: 'fra.biomassStockTotal.totalForestBiomass' } },
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
                  labelKey: 'biomassStock.aboveGround',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.aboveGround',
              variableName: 'forest_above_ground',
              variableExport: 'forest_above_ground',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * biomassStockAvg.forest_above_ground) / 1000',
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
                  labelKey: 'biomassStock.belowGround',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.belowGround',
              variableName: 'forest_below_ground',
              variableExport: 'forest_below_ground',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * biomassStockAvg.forest_below_ground) / 1000',
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
                  labelKey: 'biomassStock.deadWood',
                  className: 'fra-table__category-cell',
                },
                ...reportYears.map((colName, idx) => ({
                  idx,
                  colName,
                  type: 'decimal',
                })),
              ],
              labelKey: 'biomassStock.deadWood',
              variableName: 'forest_deadwood',
              variableExport: 'forest_deadwood',
              migration: {
                calcFormula: {
                  '2025': '(extentOfForest.forestArea * biomassStockAvg.forest_deadwood) / 1000',
                },
                readonly: false,
              },
            },
          ],
          dataExport: false,
          unit: 'millionTonnes',
          migration: {
            cycles: ['2025'],
            columnNames: {
              '2025': [...reportYears],
            },
          },
        },
        ...getStatusAndTierTable('biomassStock', 'biomassStock'),
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
