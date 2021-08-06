import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['65a']

const variables = ['forestry', 'manufacture_of_wood_and_articles_in_wood', 'manufacture_of_paper_and_paper_products']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_5a,
  unit: Unit.thousandPersons,
  columnsExport: ['total', 'gender_male', 'gender_female', 'age_group_15_49', 'age_group_50_plus'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.total',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.gender',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.ageGroup',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.male',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge.female',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge._15_49',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge._50_',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByGenderAndAge._1000Persons',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.employmentByGenderAndAge.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const employmentByGenderAndAge = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default employmentByGenderAndAge
