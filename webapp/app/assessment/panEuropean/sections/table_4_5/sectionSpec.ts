// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['45']

const variables1 = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const variables2 = ['coniferous', 'broadleaved']

const years1 = [...PanEuropean.years90_15].reverse()

const years2 = [...PanEuropean.years15]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_5,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total', 'standing', 'lying'],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.deadwood.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.deadwood.volumeOfDeadwoodM3Ha',
          [SectionSpec.KEYS_COL.colSpan]: 3,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.deadwood.total',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.deadwood.standing',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.deadwood.lying',
        }),
      ],
    }),
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'flatMap' does not exist on type 'string[... Remove this comment to see the full error message
    ...variables1.flatMap((variable: any) =>
      years1.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.deadwood.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
    // Volume of deadwood in FOWL by species groups
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'panEuropean.deadwood.volumeOfDeadwoodInFOWLBySpeciesGroups',
      [SectionSpec.KEYS_ROW.colSpan]: 4,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
    }),
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'flatMap' does not exist on type 'string[... Remove this comment to see the full error message
    ...variables2.flatMap((variable: any) =>
      years2.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.deadwood.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const deadwood = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default deadwood
