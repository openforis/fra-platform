import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['42b']

const variables = ['forest']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_2b,
  unit: Unit.haThousand,
  columnsExport: ['afforestation', 'natural_expansion', 'natural_regeneration', 'planting_and_seeding', 'coppice'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.annualForestExpansionAndRegeneration1000ha',
          colSpan: 5,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.expansionOfForestArea',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.regenerationOfForestArea',
          colSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.afforestationExpansion',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalExpansion',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalRegeneration',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.plantingAndSeeding',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.annualForestExpansionAndRegeneration.coppiceRegeneration',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.annualForestExpansionAndRegeneration.${variable}`,
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

const annualForestExpansionAndRegeneration = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default annualForestExpansionAndRegeneration
