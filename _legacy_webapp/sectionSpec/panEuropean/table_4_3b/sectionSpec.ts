import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['43b']

const variables = ['forest']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_3b,
  unit: Unit.haThousand,
  columnsExport: [
    'naturally_established',
    'naturalised_introduced_species',
    'established_by_planting_and_or_seeding',
    'coppice',
    'unknown_origin',
    'native_species',
    'introduced_species',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.area1000ha',
          colSpan: 7,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.semiNatural',
          colSpan: 5,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.plantations',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.naturallyEstablished',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.naturalisedIntroducedSpecies',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.establishedByPlantingAndOrSeeding',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.coppiceSemiNatural',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.unknownOrigin',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.nativeSpecies',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.naturalnessBySubclasses.introducedSpecies',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.naturalnessBySubclasses.${variable}`,
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
          ],
        })
      )
    ),
  ],
})

const naturalnessBySubclasses = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default naturalnessBySubclasses
