import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as ForestAreaChangeState from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeState'
import * as ForestAreaChangeValidatorState from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeValidatorState'

import { updateForestAreaChangeCell } from '@webapp/app/assessment/fra/sections/forestAreaChange/actions'

const section = FRA.sections['1'].children.c
const { yearsRange } = FRA

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.forestAreaChange,
  [SectionSpec.KEYS_TABLE.updateTableDataCell]: updateForestAreaChangeCell,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestAreaChange.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'forestAreaChange.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsRange.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map((yearRange) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `forestAreaChange.forestExpansion`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.forest_expansion,
      [SectionSpec.KEYS_ROW.variableNo]: 'a',
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaChangeValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `forestAreaChange.ofWhichAfforestation`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.afforestation,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaChangeValidatorState.forestExpansionValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `forestAreaChange.ofWhichNaturalExpansion`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.natural_expansion,
      [SectionSpec.KEYS_ROW.subcategory]: true,
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaChangeValidatorState.forestExpansionValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `forestAreaChange.deforestation`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.deforestation,
      [SectionSpec.KEYS_ROW.variableNo]: 'b',
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: ForestAreaChangeValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'forestAreaChange.forestAreaNetChange',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.forest_area_net_change,
      [SectionSpec.KEYS_ROW.variableNo]: 'a-b',
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ForestAreaChangeState.getExtentOfForestChange,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: ForestAreaChangeValidatorState.getValidationMessages,
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
