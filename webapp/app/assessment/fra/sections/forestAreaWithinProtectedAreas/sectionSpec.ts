import { FRA } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

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
    [SectionSpec.KEYS_ROW.cols]: FRA.years.map((year: any) =>
      SectionSpec.newColHeader({ [SectionSpec.KEYS_COL.label]: year })
    ),
  }),
]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestAreaWithinProtectedAreas,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.years,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.haThousand,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    ...rowsHeader,
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.header',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.forest_area_within_protected_areas,
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaWithinProtectedAreasValidatorState.forestAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.forest_area_with_long_term_management_plan,
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaWithinProtectedAreasValidatorState.forestAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.of_which_in_protected_areas,
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
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestAreaWithinProtectedAreas = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestAreaWithinProtectedAreas
