import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['1'].children['13a2']

const variables = [
  'forest_available_for_wood_supply_even_aged_stands_of_which',
  'predominantly_coniferous_forest',
  'predominantly_broadleaved_forest',
  'mixed_forest',
]

const years = [...PanEuropean.years90_15].reverse()
const subcategories = variables.slice(1)

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_3a2,
  unit: Unit.thousandCubicMeter,
  columnsExport: ['total_volume', 'regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.developmentPhases',
          colSpan: 4,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply._1000M3',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          subcategory: !!subcategories.includes(variable),
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

const ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply
