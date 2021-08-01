import { PanEuropean } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['49']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_9,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.haThousand,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['mcpfe_class_1_1', 'mcpfe_class_1_2', 'mcpfe_class_1_3', 'mcpfe_class_2'],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.mcpfe_class_1_1',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.mcpfe_class_1_2',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.mcpfe_class_1_3',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.mcpfe_class_2',
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectedForests.ha1000',
          [SectionSpec.KEYS_COL.colSpan]: 4,
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.protectedForests.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
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

const protectedForests = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default protectedForests
