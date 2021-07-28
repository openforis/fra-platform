import { FRA } from '@core/assessment'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

import * as AreaAffectedByFireValidatorState from '@webapp/app/assessment/fra/sections/areaAffectedByFire/areaAffectedByFireValidatorState'

const section = FRA.sections['5'].children.b

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.areaAffectedByFire,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.yearsAnnual,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'areaAffectedByFire.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'areaAffectedByFire.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: FRA.yearsAnnual.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map((year: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'areaAffectedByFire.totalLandAreaAffectedByFire',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.total_land_area_affected_by_fire,
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map(() => SectionSpec.newColDecimal()),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'areaAffectedByFire.ofWhichForest',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.of_which_on_forest,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: AreaAffectedByFireValidatorState.totalForestLandAreaAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: AreaAffectedByFireValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const areaAffectedByFire = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default areaAffectedByFire
