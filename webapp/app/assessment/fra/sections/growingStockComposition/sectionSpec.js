import * as FRA from '@common/assessment/fra'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as R from 'ramda'

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
    ...R.range(1, 11).map(idx =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'growingStockComposition.rank',
        [SectionSpec.KEYS_ROW.labelParams]: { idx },
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          ...years.map(() => SectionSpec.newColDecimal()),
        ],
      })
    ),
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
