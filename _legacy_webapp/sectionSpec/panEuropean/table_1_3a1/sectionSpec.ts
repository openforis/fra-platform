import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['1'].children['13a1']

// eslint-disable-next-line
const forest_even_aged_stands_of_which = 'forest_even_aged_stands_of_which'

const variables = [
  // eslint-disable-next-line
  forest_even_aged_stands_of_which,
  'available_for_wood_supply_of_which',
  'predominantly_coniferous_forest',
  'predominantly_broadleaved_forest',
  'mixed_forest',
]

const years = [...PanEuropean.years90_15].reverse()
const subcategories = variables.slice(2)

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_3a1,
  unit: Unit.haThousand,
  columnsExport: ['total_area', 'regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.developmentPhases',
          colSpan: 4,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.regeneration_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.intermediate_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mature_phase',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.unspecified',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands._1000Ha',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.ageClassDistributionAreaOfEvenAgedStands.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          // eslint-disable-next-line camelcase
          mainCategory: variable === forest_even_aged_stands_of_which,
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

const ageClassDistributionAreaOfEvenAgedStands = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default ageClassDistributionAreaOfEvenAgedStands
