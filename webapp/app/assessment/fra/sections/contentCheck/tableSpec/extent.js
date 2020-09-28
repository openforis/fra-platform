import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import { extent } from '@common/model/traditionalTable/contentCheck'
import section from '../section'

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.extent,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.extent',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: extent.columns.map(({ name }) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: name,
        })
      ),
    }),

    ...extent.rows.names.map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: extent.columns.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

export default tableSpec
