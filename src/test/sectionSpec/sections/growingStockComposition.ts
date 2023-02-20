// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

// Table 2b, the “% of total” should be calculated,
// meaning each data entry should be divided by
// the Total growing stock and multiplied by 100 to display as a %.
const getGrowingStockPercent = (idx: number, variable: string) => {
  const tableName = 'growingStockComposition2025'
  const variableName = `${variable}${idx}`
  const variableNameTotal = 'totalGrowingStock'
  const colName = 'growingStockMillionCubicMeter'
  return `(${tableName}.${variableName}['${colName}'] / ${tableName}.${variableNameTotal}['${colName}']) * 100`
}

const totalNativeGrowingStockPercent = `${[1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((idx) => `growingStockComposition2025.nativeRank${idx}['growingStockMillionCubicMeter']`)
  .join(` || `)} || growingStockComposition2025.remainingNative['growingStockMillionCubicMeter']
                  ? ((${[1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map(
                      (idx) => `(growingStockComposition2025.nativeRank${idx}['growingStockMillionCubicMeter'] || 0)`
                    )
                    .join(
                      ' + '
                    )} + growingStockComposition2025.remainingNative['growingStockMillionCubicMeter'] || 0) / growingStockComposition2025.totalGrowingStock['growingStockMillionCubicMeter'] * 100)
                  : null`

const remainingIntroducedGrowingStockPercent = `${[1, 2, 3, 4, 5]
  .map((idx) => `growingStockComposition2025.nativeRank${idx}['growingStockMillionCubicMeter']`)
  .join(` || `)}
                  ? (${[1, 2, 3, 4, 5]
                    .map(
                      (idx) => `(growingStockComposition2025.nativeRank${idx}['growingStockMillionCubicMeter'] || 0)`
                    )
                    .join(
                      ' + '
                    )} / growingStockComposition2025.totalGrowingStock['growingStockMillionCubicMeter'] * 100)
                  : null`

export const growingStockComposition: SectionSpec = {
  sectionName: 'growingStockComposition',
  sectionAnchor: '2b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'growingStockComposition',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'fra.categoryHeader2020' },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStockComposition.scientificName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStockComposition.commonName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'growingStockComposition.areaUnitLabel',
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
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  label: 2020,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 8,
                  rowSpan: 1,
                  labelKey: 'growingStockComposition.nativeTreeSpecies',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
              ],
              type: 'header',
              migration: {
                readonly: true,
              },
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 1,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank1',
              labelParams: {
                idx: 1,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 2,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank2',
              labelParams: {
                idx: 2,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 3,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank3',
              labelParams: {
                idx: 3,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 4,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank4',
              labelParams: {
                idx: 4,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 5,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank5',
              labelParams: {
                idx: 5,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 6,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank6',
              labelParams: {
                idx: 6,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 7,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank7',
              labelParams: {
                idx: 7,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 8,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank8',
              labelParams: {
                idx: 8,
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
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 9,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank9',
              labelParams: {
                idx: 9,
              },
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 10,
                  },
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.native',
              variableExport: 'native_rank10',
              labelParams: {
                idx: 10,
              },
            },

            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'growingStockComposition.remainingNative',
                  className: 'fra-table__header-cell-left',
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
              ],
              labelKey: 'growingStockComposition.remainingNative',
              variableExport: 'remaining_native',
              colSpan: 3,
              mainCategory: true,
              migration: {
                colNames: ['1990', '2000', '2010', '2015', '2020'],
              },
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'growingStockComposition.totalNative',
                  className: 'fra-table__header-cell-left',
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
              ],
              labelKey: 'growingStockComposition.totalNative',
              variableExport: 'total_native',
              colSpan: 3,
              mainCategory: true,
              variableName: 'total_native_placeholder',
              migration: {
                calcFormula:
                  '(growingStockComposition.native_rank1 || 0) + (growingStockComposition.native_rank2 || 0) + (growingStockComposition.native_rank3 || 0) + (growingStockComposition.native_rank4 || 0) + (growingStockComposition.native_rank5 || 0) + (growingStockComposition.native_rank6 || 0) + (growingStockComposition.native_rank7 || 0) + (growingStockComposition.native_rank8 || 0) + (growingStockComposition.native_rank9 || 0) + (growingStockComposition.native_rank10 || 0) + (growingStockComposition.remaining_native || 0)',
                colNames: ['1990', '2000', '2010', '2015', '2020'],
              },
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 8,
                  labelKey: 'growingStockComposition.introducedTreeSpecies',
                  className: 'fra-table__header-cell-left',
                },
              ],
              labelKey: 'growingStockComposition.introducedTreeSpecies',
              colSpan: 8,
              mainCategory: true,
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 1,
                  },
                  labelPrefixKey: 'growingStockComposition.introduced',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.introduced',
              variableExport: 'introduced_rank1',
              labelParams: {
                idx: 1,
              },
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 2,
                  },
                  labelPrefixKey: 'growingStockComposition.introduced',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.introduced',
              variableExport: 'introduced_rank2',
              labelParams: {
                idx: 2,
              },
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 3,
                  },
                  labelPrefixKey: 'growingStockComposition.introduced',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.introduced',
              variableExport: 'introduced_rank3',
              labelParams: {
                idx: 3,
              },
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 4,
                  },
                  labelPrefixKey: 'growingStockComposition.introduced',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.introduced',
              variableExport: 'introduced_rank4',
              labelParams: {
                idx: 4,
              },
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'growingStockComposition.rank',
                  labelParams: {
                    idx: 5,
                  },
                  labelPrefixKey: 'growingStockComposition.introduced',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'taxon',
                },
                {
                  idx: 1,
                  type: 'text',
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
              ],
              labelKey: 'growingStockComposition.rank',
              labelPrefixKey: 'growingStockComposition.introduced',
              variableExport: 'introduced_rank5',
              labelParams: {
                idx: 5,
              },
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'growingStockComposition.remainingIntroduced',
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: '1990',
                  migration: {
                    forceColName: true,
                  },
                },
                {
                  idx: 3,
                  type: 'decimal',
                  colName: '2000',
                  migration: {
                    forceColName: true,
                  },
                },
                {
                  idx: 4,
                  type: 'decimal',
                  colName: '2010',
                  migration: {
                    forceColName: true,
                  },
                },
                {
                  idx: 5,
                  type: 'decimal',
                  colName: '2015',
                  migration: {
                    forceColName: true,
                  },
                },
                {
                  idx: 6,
                  type: 'decimal',
                  colName: '2020',
                  migration: {
                    forceColName: true,
                  },
                },
              ],
              labelKey: 'growingStockComposition.remainingIntroduced',
              variableExport: 'remaining_introduced_placeholder',
              colSpan: 3,
              mainCategory: true,
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'growingStockComposition.totalIntroduced',
                  className: 'fra-table__header-cell-left',
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
              ],
              labelKey: 'growingStockComposition.totalIntroduced',
              variableExport: 'total_remaining',
              colSpan: 3,
              mainCategory: true,
              variableName: 'totalIntroduced',
              migration: {
                calcFormula:
                  '(growingStockComposition.introduced_rank1 || 0) + (growingStockComposition.introduced_rank2 || 0) + (growingStockComposition.introduced_rank3 || 0) + (growingStockComposition.introduced_rank4 || 0) + (growingStockComposition.introduced_rank5 || 0) + (growingStockComposition.remaining_introduced_placeholder || 0)',
                colNames: ['1990', '2000', '2010', '2015', '2020'],
              },
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 3,
                  labelKey: 'growingStockComposition.totalGrowingStock',
                  className: 'fra-table__header-cell-left',
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
              ],
              labelKey: 'growingStockComposition.totalGrowingStock',
              colSpan: 3,
              mainCategory: true,
              variableName: 'totalGrowingStock',
              migration: {
                calcFormula:
                  '(growingStockComposition.total_native_placeholder || 0) + (growingStockComposition.totalIntroduced || 0)',
                colNames: ['1990', '2000', '2010', '2015', '2020'],
                validateFns: [
                  `validatorEqualToTotalGrowingStock(growingStockTotal.forest['2025'], growingStockComposition2025.totalGrowingStock)`,
                ],
              },
            },
            {
              idx: 21,
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
              idx: 22,
              type: 'validationMessages',
              cols: [],
            },
          ],
          tableDataRequired: [
            {
              assessmentType: 'fra2020',
              sectionName: 'growingStock',
              tableName: 'growingStock',
            },
          ],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: ['common_name', 'scientific_name'],
          columnsExport: [1990, 2000, 2010, 2015, 2020],
          unit: 'millionsCubicMeterOverBark',
          migration: {
            cycles: ['2020'],
          },
        },
        {
          name: 'growingStockComposition2025',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'fra.categoryHeader2025' },
                    },
                    style: {
                      '2025': { colSpan: 1, rowSpan: 2 },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStockComposition.scientificName',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'growingStockComposition.commonName',
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
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'fra.growingStockComposition.millionCubicMeter' },
                    },
                    style: {
                      '2025': { colSpan: 1, rowSpan: 1 },
                    },
                  },
                },
                {
                  idx: 1,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'fra.growingStockComposition.percentOfTotal' },
                    },
                    style: {
                      '2025': { colSpan: 1, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'growingStockComposition.nativeTreeSpecies' },
                    },
                    style: {
                      '2025': { colSpan: 5, rowSpan: 1 },
                    },
                  },
                },
              ],
              type: 'header',
              migration: {
                readonly: true,
              },
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 3,
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2025': { key: 'fra.growingStockComposition.mostRecentYear' },
                    },
                    style: {
                      '2025': { colSpan: 4, rowSpan: 1 },
                    },
                  },
                },
                {
                  idx: 4,
                  type: 'select',
                  options: Array.from({ length: 15 }, (_, i) => ({
                    optionName: String(2025 - i),
                  })),
                  optionsLabelKeyPrefix: undefined,
                  colName: 'mostRecentYear',
                },
              ],
              labelKey: 'growingStockComposition.mostRecentYear',
              variableExport: 'mostRecentYear',
              variableName: 'mostRecentYear',
              colSpan: 3,
              mainCategory: true,
              migration: {
                colNames: ['mostRecentYear'],
              },
            },

            ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => ({
              idx: idx + 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.growingStockComposition.ranked', params: { idx: `${idx + 1}` } },
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'taxon',
                  colName: 'scientific_name',
                },
                {
                  idx: 1,
                  type: 'text',
                  colName: 'common_name',
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: 'growingStockMillionCubicMeter',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: getGrowingStockPercent(idx + 1, 'nativeRank'),
                  },
                },
              ],
              variableName: `nativeRank${idx + 1}`,
              migration: {
                cycles: ['2025'],
              },
            })),
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'growingStockComposition.remainingNative' } },
                    style: { '2025': { colSpan: 3, rowSpan: 1 } },
                  },
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: 'growingStockMillionCubicMeter',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: `growingStockComposition2025.remainingNative['growingStockMillionCubicMeter'] ?
                     (growingStockComposition2025.remainingNative['growingStockMillionCubicMeter'] / growingStockComposition2025.totalGrowingStock['growingStockMillionCubicMeter']) * 100
                     : null
                    `,
                  },
                },
              ],
              labelKey: 'growingStockComposition.remainingNative',
              variableExport: 'remainingNative',
              variableName: 'remainingNative',
              colSpan: 3,
              mainCategory: true,
              migration: {
                colNames: ['growingStockMillionCubicMeter', 'growingStockPercent'],
              },
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'fra.growingStockComposition.totalNativeTreeSpecies' } },
                    style: { '2025': { colSpan: 3, rowSpan: 1 } },
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'growingStockMillionCubicMeter',
                  migration: {
                    calculateFn: `${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                      .map((idx) => `growingStockComposition2025.nativeRank${idx}`)
                      .join(` || `)} || growingStockComposition2025.remainingNative
                  ? ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    .map((idx) => `(growingStockComposition2025.nativeRank${idx} || 0)`)
                    .join(' + ')} + (growingStockComposition2025.remainingNative || 0)
                  : null`,
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: totalNativeGrowingStockPercent,
                  },
                },
              ],
              labelKey: 'growingStockComposition.totalNative',
              colSpan: 3,
              mainCategory: true,
              variableName: 'totalNative',
              migration: {
                colNames: ['growingStockMillionCubicMeter', 'growingStockPercent'],
              },
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'growingStockComposition.introducedTreeSpecies' } },
                    style: { '2025': { colSpan: 5, rowSpan: 1 } },
                  },
                },
              ],
              labelKey: 'growingStockComposition.introducedTreeSpecies',
              colSpan: 8,
              mainCategory: true,
            },
            ...[0, 1, 2, 3, 4].map((idx) => ({
              idx: idx + 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelPrefixKey: 'growingStockComposition.native',
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': { key: 'fra.growingStockComposition.ranked', params: { idx: `${idx + 1}` } },
                    },
                  },
                },
                {
                  idx: 0,
                  type: 'taxon',
                  colName: 'scientific_name',
                },
                {
                  idx: 1,
                  type: 'text',
                  colName: 'common_name',
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: 'growingStockMillionCubicMeter',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: getGrowingStockPercent(idx + 1, 'introducedRank'),
                  },
                },
              ],
              variableName: `introducedRank${idx + 1}`,
              migration: {
                cycles: ['2025'],
              },
            })),
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'growingStockComposition.remainingIntroduced' } },
                    style: { '2025': { colSpan: 3, rowSpan: 1 } },
                  },
                },
                {
                  idx: 2,
                  type: 'decimal',
                  colName: 'growingStockMillionCubicMeter',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: remainingIntroducedGrowingStockPercent,
                  },
                },
              ],
              variableName: 'remainingIntroduced',
              colSpan: 3,
              mainCategory: true,
              migration: {
                colNames: ['growingStockMillionCubicMeter', 'growingStockPercent'],
              },
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'fra.growingStockComposition.totalIntroducedTreeSpecies' } },
                    style: { '2025': { colSpan: 3, rowSpan: 1 } },
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'growingStockMillionCubicMeter',
                  migration: {
                    calculateFn: `(${[1, 2, 3, 4, 5]
                      .map((idx) => `growingStockComposition2025.introducedRank${idx}`)
                      .join(` || `)} || growingStockComposition2025.remainingIntroduced)
                  ? ${[1, 2, 3, 4, 5]
                    .map((idx) => `(growingStockComposition2025.introducedRank${idx} || 0)`)
                    .join(' + ')} + (growingStockComposition2025.remainingIntroduced || 0)
                  : null`,
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                  migration: {
                    calculateFn: `
                     growingStockComposition2025.totalIntroduced['growingStockMillionCubicMeter'] ?
                     (growingStockComposition2025.totalIntroduced['growingStockMillionCubicMeter'] / growingStockComposition2025.totalGrowingStock['growingStockMillionCubicMeter']) * 100
                     : null
                    `,
                  },
                },
              ],
              mainCategory: true,
              variableName: 'totalIntroduced',
              migration: {
                colNames: ['growingStockMillionCubicMeter', 'growingStockPercent'],
              },
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  className: 'fra-table__header-cell-left',
                  migration: {
                    label: { '2025': { key: 'fra.growingStockComposition.totalGrowingStock' } },
                    style: { '2025': { colSpan: 3, rowSpan: 1 } },
                  },
                },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'growingStockMillionCubicMeter',
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'growingStockPercent',
                },
              ],
              mainCategory: true,
              variableName: 'totalGrowingStock',
              migration: {
                calcFormula: `(growingStockComposition2025.totalNative || growingStockComposition2025.totalIntroduced)
                  ? (growingStockComposition2025.totalNative || 0) + (growingStockComposition2025.totalIntroduced || 0)
                  : null`,
                colNames: ['growingStockMillionCubicMeter'],
              },
            },
          ],
          tableDataRequired: [
            {
              assessmentType: 'fra2020',
              sectionName: 'growingStock',
              tableName: 'growingStock',
            },
          ],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: ['scientific_name', 'common_name'],
          columnsExport: ['growingStockMillionCubicMeter', 'growingStockPercent'],
          unit: 'growingStockPercent',
          migration: {
            columnNames: {
              '2025': ['scientific_name', 'common_name', 'growingStockPercent'],
            },
            cycles: ['2025'],
          },
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
      '2020': { key: 'growingStockComposition.growingStockComposition' },
      '2025': { key: 'fra.growingStockComposition.updatedGrowingStockComposition' },
    },
  },
}
