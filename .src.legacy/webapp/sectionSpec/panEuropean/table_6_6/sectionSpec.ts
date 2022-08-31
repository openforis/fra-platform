import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['6'].children['66']

const variables = ['forestry_isic_nace_02']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_6,
  columnsExport: [
    'fatal_occupational_accidents_number',
    'fatal_occupational_accidents_per_1000_workers',
    'non_fatal_occupational_accidents_number',
    'non_fatal_occupational_accidents_per_1000_workers',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.fatalOccupationalAccidents',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.nonFatalOccupationalAccidents',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.number',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.annualRatePer1000Workers',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.number',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.occupationalAccidents.annualRatePer1000Workers',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.occupationalAccidents.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
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

const occupationalAccidents = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default occupationalAccidents
