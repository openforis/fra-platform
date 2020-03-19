import * as FRA from '@common/assessment/fra'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as GrowingStockCompositionState from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionState'

const section = FRA.sections['2'].children.b
const years = FRA.yearsTable

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.growingStockComposition,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.scientificName',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.commonName',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        ...years.map(year =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
          })
        ),
      ],
    }),
    // Native tree species rows
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'growingStockComposition.nativeTreeSpecies',
          [SectionSpec.KEYS_COL.colSpan]: years.length + 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),
    ...GrowingStockCompositionState.rowIndexes.native.map(idx =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.rank',
        [SectionSpec.KEYS_ROW.labelParams]: { idx: idx + 1 },
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          ...years.map(() => SectionSpec.newColDecimal()),
        ],
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.remainingNative',
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year, i) =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: i + 2,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.totalNative',
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: years.map((year, i) =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: GrowingStockCompositionState.getTotalNativeTreeSpecies,
          [SectionSpec.KEYS_COL.idx]: i + 2,
        })
      ),
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const growingStockComposition = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default growingStockComposition
