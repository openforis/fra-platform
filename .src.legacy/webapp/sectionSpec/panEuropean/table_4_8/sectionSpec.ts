import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['48']

const variables = [
  'trees',
  'birds',
  'mammals',
  'other_vertebrates',
  'invertebrates',
  'vascular_plants',
  'cryptogams_and_fungi',
]

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_8,
  unit: Unit.absoluteNumber,
  columnsExport: ['total_of_taxa', 'vulnerable', 'endangered', 'critically_endangered', 'extinct_in_the_wild'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.total_of_taxa',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.threatenedForestSpeciesCol',
          colSpan: 4,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.vulnerable',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.endangered',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.critically_endangered',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.extinct_in_the_wild',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.threatenedForestSpecies.absoluteNumber',
          colSpan: 5,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.threatenedForestSpecies.${variable}`,
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

const threatenedForestSpecies = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default threatenedForestSpecies
