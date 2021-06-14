import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import holderOfManagementRights from '@server/dataTable/mappings/fra/holderOfManagementRights'
import section from '../section'

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.holderOfManagementRights,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.holderOfManagementRights.title',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: holderOfManagementRights.columns.map(({ name }: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: name,
        })
      ),
    }),

    ...holderOfManagementRights.rows.names.map((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.holderOfManagementRights.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: holderOfManagementRights.columns.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

export default tableSpec
