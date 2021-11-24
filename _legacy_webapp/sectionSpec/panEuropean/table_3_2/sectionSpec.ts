import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['3'].children['32']

const variables = ['roundwood']

const years = [...PanEuropean.years88_17].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_3_2,
  columnsExport: [
    'total_volume',
    'industrial_roundwood_volume',
    'industrial_roundwood_market_value',
    'woodfuel_volume',
    'woodfuel_market_value',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.woodRemovals',
          colSpan: 5,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.total',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.industrialRoundwood',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.woodfuel',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.volume1000M3UB',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.volume1000M3UB',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.marketValue1000NationalCurrency',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.volume1000M3UB',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.removals.marketValue1000NationalCurrency',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.removals.${variable}`,
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

const removals = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default removals
