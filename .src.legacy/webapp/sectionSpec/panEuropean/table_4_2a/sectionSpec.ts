import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['42a']

const variables = ['forest']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_2a,
  unit: Unit.haThousand,
  columnsExport: [
    'natural_expansion_and_natural_regeneration',
    'afforestation_and_regeneration_by_planting_and_or_seeding',
    'coppice',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalForestAreaByExpansionAndRegenerationType.totalAreaOfForestByExpansionRegenerationType1000ha',
          colSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalForestAreaByExpansionAndRegenerationType.natural_expansion_and_natural_regeneration',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey:
            'panEuropean.totalForestAreaByExpansionAndRegenerationType.afforestation_and_regeneration_by_planting_and_or_seeding',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.coppice',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.totalForestAreaByExpansionAndRegenerationType.${variable}`,
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

const totalForestAreaByExpansionAndRegenerationType = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default totalForestAreaByExpansionAndRegenerationType
