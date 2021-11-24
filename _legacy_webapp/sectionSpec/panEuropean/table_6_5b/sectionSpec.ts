import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['6'].children['65b']

const variables = ['forestry', 'manufacture_of_wood_and_articles_in_wood', 'manufacture_of_paper_and_paper_products']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_5b,
  unit: Unit.thousandPersons,
  columnsExport: ['education_0_2', 'education_3_4', 'education_5_6', 'employees', 'self_employed'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics.education',
          colSpan: 3,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics.jobCharacteristics',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics._0_2',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics._3_4',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics._5_6',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics.employeesJobCharacteristics',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics.selfEmployed',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.employmentByEducationAndJobCharacteristics._1000Persons',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.employmentByEducationAndJobCharacteristics.${variable}`,
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

const employmentByEducationAndJobCharacteristics = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default employmentByEducationAndJobCharacteristics
