import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as AreaOfPermanentForestEstateValidatorState from '@webapp/app/assessment/fra/sections/areaOfPermanentForestEstate/areaOfPermanentForestEstateValidatorState'

const section = FRA.sections['6'].children.b
const { yearsTable } = FRA

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.areaOfPermanentForestEstate,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'areaOfPermanentForestEstate.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'areaOfPermanentForestEstate.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsTable.length + 1,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'areaOfPermanentForestEstate.applicable',
        }),
        ...yearsTable.map(year =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
          })
        ),
      ],
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColSelectYesNo(),
        ...yearsTable.map(() =>
          SectionSpec.newColDecimal({
            [SectionSpec.KEYS_COL.validator]: AreaOfPermanentForestEstateValidatorState.areaOfPermanentEstateValidator,
          })
        ),
      ],
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: AreaOfPermanentForestEstateValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const areaOfPermanentForestEstate = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
})

export default areaOfPermanentForestEstate
