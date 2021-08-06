import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['1'].children['12a']

const variables = [
  'forest',
  '_of_which_available_for_wood_supply',
  'other_wooded_land',
  'total_forest_and_other_wooded_land',
]

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_2a,
  unit: Unit.millionsCubicMeterOverBark,
  columnsExport: ['total', 'coniferous', 'broadleaved'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock.growingStockMillionM3OB',
          colSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock.total',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock._ofWhich',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock.coniferous',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStock.broadleaved',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.growingStock.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const growingStock = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default growingStock
