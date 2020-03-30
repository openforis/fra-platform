import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as SpecificForestCategoriesValidatorState from './specificForestCategoriesValidatorState'

const section = FRA.sections['1'].children.e
const { yearsTable } = FRA

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.specificForestCategories,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'specificForestCategories.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'specificForestCategories.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: yearsTable.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(yearRange =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `specificForestCategories.bamboo`,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `specificForestCategories.mangroves`,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `specificForestCategories.temporarilyUnstocked`,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `specificForestCategories.primaryForest`,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() => SectionSpec.newColDecimal({})),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `specificForestCategories.rubberWood`,
      [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: SpecificForestCategoriesValidatorState.forestAreaValidator,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: SpecificForestCategoriesValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const specificForestCategories = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default specificForestCategories
