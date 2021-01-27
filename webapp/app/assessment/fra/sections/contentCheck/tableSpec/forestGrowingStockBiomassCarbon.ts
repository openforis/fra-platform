import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import forestGrowingStockBiomassCarbon from '@common/model/traditionalTable/contentCheck/forestGrowingStockBiomassCarbon'
import section from '../section'

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestGrowingStockBiomassCarbon,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.forestGrowingStockBiomassCarbon.title',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: forestGrowingStockBiomassCarbon.columns.map(({ name }: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: name,
        })
      ),
    }),

    ...forestGrowingStockBiomassCarbon.rows.names.map((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.forestGrowingStockBiomassCarbon.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: forestGrowingStockBiomassCarbon.columns.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

export default tableSpec
