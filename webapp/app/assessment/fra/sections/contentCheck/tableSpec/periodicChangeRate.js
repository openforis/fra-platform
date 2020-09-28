import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as FRA from '@common/assessment/fra'

import periodicChangeRate from '@common/model/traditionalTable/contentCheck/periodicChangeRate'
import section from '../section'

const asRange = (arr) => arr.map((_, i) => i < arr.length - 1 && `${arr[i]}-${arr[i + 1]}`).filter(Boolean)

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.periodicChangeRate,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.periodicChangeRate',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: asRange(FRA.years).map((yearRange) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),

    ...periodicChangeRate.rows.names.map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: asRange(FRA.years).map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})
export default tableSpec
