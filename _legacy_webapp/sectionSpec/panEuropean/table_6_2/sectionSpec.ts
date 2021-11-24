import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['6'].children['62']

const variables = ['forestry', 'manufacture_of_wood_and_articles_in_wood', 'manufacture_of_paper_and_paper_products']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_2,
  columnsExport: ['million_national_currency', 'percent_of_total_gva'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.grossValueAdded.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.grossValueAdded.grossValueAddedCol',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.grossValueAdded.million_national_currency',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.grossValueAdded.percent_of_total_gva',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.grossValueAdded.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({}), ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const grossValueAdded = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default grossValueAdded
