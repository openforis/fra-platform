import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['6'].children['61']

const variables = ['in_public_ownership', 'in_private_ownership', 'other_types_of_ownership_unknown']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_1,
  columnsExport: [
    'total_forest_area',
    'total_number_of_holdings',
    'less_10_ha_area',
    'less_10_ha_number',
    '_11_500_ha_area',
    '_11_500_ha_number',
    'more_500_ha_area',
    'more_500_ha_number',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.total_forest_area',
          rowSpan: 3,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.total_number_of_holdings',
          rowSpan: 3,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.areaAndNumberOfForestHoldingsInSizeClasses',
          colSpan: 6,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.less10ha',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings._11_500ha',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.more500ha',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.area1000Ha',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.area1000Ha',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.area1000Ha',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestHoldings.numberOfHoldings',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.forestHoldings.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
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

const forestHoldings = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestHoldings
