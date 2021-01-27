// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as AnnualReforestationValidatorState from './annualReforestationValidatorState'

const section = FRA.sections['1'].children.e
const { yearsRange } = FRA

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.annualReforestation,
  [SectionSpec.KEYS_TABLE.columnsExport]: yearsRange,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousandPerYear,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'annualReforestation.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'annualReforestation.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsRange.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map((yearRange: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `annualReforestation.reforestation`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.reforestation,
      [SectionSpec.KEYS_ROW.cols]: yearsRange.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: AnnualReforestationValidatorState.positiveOrZeroValidator,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: AnnualReforestationValidatorState.getValidationMessages,
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
