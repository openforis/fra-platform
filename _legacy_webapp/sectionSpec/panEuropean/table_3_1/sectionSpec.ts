import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['3'].children['31']

const variables = ['forest', '_of_which_forest_available_for_wood_supply']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_3_1,
  unit: Unit.thousandCubicMeterOverBark,
  columnsExport: [
    'gross_annual_increment',
    'natural_losses',
    'net_annual_increment',
    'fellings_total',
    '_of_which_of_natural_losses',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.categoryYear',
          rowSpan: 3,
          left: true,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.gross_annual_increment',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.natural_losses',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.net_annual_increment',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.fellings',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.fellingsTotal',
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.ofWhichOfNaturalLosses',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.incrementAndFellings.volume1000mob',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.incrementAndFellings.${variable}`,
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

const incrementAndFellings = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default incrementAndFellings
