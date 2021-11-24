import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { Validator } from '../../../sectionSpec/validation'
import { VARIABLES } from '../../../sectionSpec/variables'

import * as EmploymentValidatorState from '../../../sectionSpec/fra/employment/employmentValidatorState'

const section = FRA.sections['7'].children.a
const years = FRA.yearsTable.slice(0, FRA.yearsTable.length - 1)
const categories = ['total', 'female', 'male']

const variableMappings: Record<string, string> = {
  ofWhichSilviculture: VARIABLES.of_which_silviculture_and_other_forestry_activities,
  ofWhichLogging: VARIABLES.of_which_logging,
  ofWhichGathering: VARIABLES.of_which_gathering_of_non_wood_forest_products,
  ofWhichSupport: VARIABLES.of_which_support_services_to_forestry,
}

const getDataCols = (validator: Validator = null) =>
  years
    .map(() =>
      categories.map(() =>
        ColSpecFactory.newDecimalInstance({
          validator,
        })
      )
    )
    .flat()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.employment,
  columnsExport: years.flatMap((year) => categories.map((category) => `${year}_${category}`)),
  unit: Unit.fte1000,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'employment.categoryHeader',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'employment.unitHeader',
          colSpan: years.length * categories.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          label: `${year}`,
          colSpan: categories.length,
        })
      ),
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years
        .map(() =>
          categories.map((category) =>
            ColSpecFactory.newHeaderInstance({
              labelKey: `employment.${category}`,
            })
          )
        )
        .flat(),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'employment.inForestry',
      variableExport: VARIABLES.employment_in_forestry_and_logging,
      cols: getDataCols(),
    }),
    ...['ofWhichSilviculture', 'ofWhichLogging', 'ofWhichGathering', 'ofWhichSupport'].map((subcategory) =>
      RowSpecFactory.newDataInstance({
        labelKey: `employment.${subcategory}`,
        variableExport: variableMappings[subcategory],
        subcategory: true,
        cols: getDataCols(EmploymentValidatorState.genderSubCategoryValidator),
      })
    ),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: EmploymentValidatorState.getValidationMessages,
    }),
  ],
})

const employment = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
  descriptions: {
    analysisAndProcessing: false,
  },
})

export default employment
