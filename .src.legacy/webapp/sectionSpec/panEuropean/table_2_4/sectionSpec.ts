import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['2'].children['24']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_2_4,
  unit: Unit.haThousand,
  columnsExport: [
    'total_area_with_damage',
    'insects_and_disease',
    'wildlife_and_grazing',
    'forest_operations',
    'other',
    'primarily_damaged_by_abiotic_agents',
    'primarily_damaged_by_fire_total',
    'of_which_human_induced',
    'unspecified_mixed_damage',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.categoryYear',
          rowSpan: 4,
          left: true,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.total_area_with_damage',
          rowSpan: 3,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.areaWithDamageByDifferentAgents',
          colSpan: 7,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.unspecified_mixed_damage',
          rowSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByBioticAgents',
          colSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.damagePrimarilyHumanInduced',
          colSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByAbioticAgents',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFire',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.insectsAndDisease',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.wildlifeAndGrazing',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.forestOperations',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.otherHumanInduced',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFireTotal',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.ofWhichHumanInduced',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaWithDamage.thousandHa',
          colSpan: 9,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.forestAreaWithDamage.${variable}`,
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
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const forestAreaWithDamage = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestAreaWithDamage
