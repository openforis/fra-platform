import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import { eofNetChange } from './forestAreaChange'

const section = FRA.sections['1'].children.c
const { yearsRange } = FRA
const variables = ['forestExpansion', 'ofWhichAfforestation', 'deforestation', 'forestAreaNetChange']

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestAreaChange,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestAreaChange.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestAreaChange.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsRange.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(yearRange =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),
    ...variables.map(variable =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `forestAreaChange.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() => SectionSpec.newColDecimal()),
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaChange.forestAreaNetChange',
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.c.name,
      [SectionSpec.KEYS_ROW.calculateFn]: eofNetChange,
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() => SectionSpec.newColDecimal()),
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestAreaChange = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestAreaChange
