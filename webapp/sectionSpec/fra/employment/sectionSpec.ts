import { FRA } from '@core/assessment'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as EmploymentValidatorState from '@webapp/sectionSpec/fra/employment/employmentValidatorState'

const section = FRA.sections['7'].children.a
const years = FRA.yearsTable.slice(0, FRA.yearsTable.length - 1)
const categories = ['total', 'female', 'male']

const variableMappings: any = {
  ofWhichSilviculture: SectionSpec.VARIABLES.of_which_silviculture_and_other_forestry_activities,
  ofWhichLogging: SectionSpec.VARIABLES.of_which_logging,
  ofWhichGathering: SectionSpec.VARIABLES.of_which_gathering_of_non_wood_forest_products,
  ofWhichSupport: SectionSpec.VARIABLES.of_which_support_services_to_forestry,
}

const getDataCols = (validator: any = null) =>
  years
    .map(() =>
      categories.map(() =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.validator]: validator,
        })
      )
    )
    .flat()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.employment,
  [SectionSpec.KEYS_TABLE.columnsExport]: years.flatMap((year: any) =>
    categories.map((category) => `${year}_${category}`)
  ),
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.fte1000,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'employment.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'employment.unitHeader',
          [SectionSpec.KEYS_COL.colSpan]: years.length * categories.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
          [SectionSpec.KEYS_COL.colSpan]: categories.length,
        })
      ),
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years
        .map(() =>
          categories.map((category) =>
            SectionSpec.newColHeader({
              [SectionSpec.KEYS_COL.labelKey]: `employment.${category}`,
            })
          )
        )
        .flat(),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'employment.inForestry',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.employment_in_forestry_and_logging,
      [SectionSpec.KEYS_ROW.cols]: getDataCols(),
    }),
    ...['ofWhichSilviculture', 'ofWhichLogging', 'ofWhichGathering', 'ofWhichSupport'].map((subcategory) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `employment.${subcategory}`,
        [SectionSpec.KEYS_ROW.variableExport]: variableMappings[subcategory],
        [SectionSpec.KEYS_ROW.subcategory]: true,
        [SectionSpec.KEYS_ROW.cols]: getDataCols(EmploymentValidatorState.genderSubCategoryValidator),
      })
    ),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: EmploymentValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const employment = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
})

export default employment
