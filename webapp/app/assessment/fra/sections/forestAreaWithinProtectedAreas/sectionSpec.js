import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ForestAreaWithinProtectedAreasValidatorState from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/forestAreaWithinProtectedAreasValidatorState'

const section = FRA.sections['3'].children.b

const rowsHeader = [
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'forestAreaWithinProtectedAreas.categoryHeader',
        [SectionSpec.KEYS_COL.rowSpan]: 2,
        [SectionSpec.KEYS_COL.left]: true,
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'forestAreaWithinProtectedAreas.areaUnitLabel',
        [SectionSpec.KEYS_COL.colSpan]: FRA.years.length,
      }),
    ],
  }),
  SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: FRA.years.map(year =>
      SectionSpec.newColHeader({ [SectionSpec.KEYS_COL.label]: year })
    ),
  }),
]

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestAreaWithinProtectedAreas,
  [SectionSpec.KEYS_TABLE.rows]: [
    ...rowsHeader,
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.header',
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaWithinProtectedAreasValidatorState.protectedAreaValidator,
        })
      ),
      [SectionSpec.KEYS_ROW.subcategory]: true,
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: ForestAreaWithinProtectedAreasValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1],
})

const forestAreaWithinProtectedAreas = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestAreaWithinProtectedAreas
