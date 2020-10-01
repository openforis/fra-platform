import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import forestOwnership from '@server/traditionalTable/mappings/fra/forestOwnership'
import section from '../section'

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestOwnership,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.forestOwnership.title',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: forestOwnership.columns.map(({ name }) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: name,
        })
      ),
    }),

    ...forestOwnership.rows.names
      .filter((row) => !row.includes('of_which'))
      .map((variable) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.forestOwnership.${variable}`,
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
          [SectionSpec.KEYS_ROW.cols]: forestOwnership.columns.map(() => SectionSpec.newColDecimal()),
        })
      ),
  ],
})

export default tableSpec
