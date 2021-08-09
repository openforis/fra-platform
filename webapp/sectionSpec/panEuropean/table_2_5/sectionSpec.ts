import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['2'].children['25']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec1 = TableSpecFactory.newInstance({
  name: section.tables.table_2_5,
  unit: Unit.haThousand,
  columnsExport: [
    'total_area_of_degraded_land',
    'grazing',
    'repeated_fires',
    'air_pollution',
    'desertification',
    'other_1',
    'other_2',
    'other_3',
    'unknown',
    'former_degraded_land_restored',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.categoryYear',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.totalAreaOfDegradedLand',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.areaPrimarilyDegradedBy',
          colSpan: 8,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.formerDegradedLandRestored',
          rowSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.grazing',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.repeatedFires',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.airPollution',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.desertification',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other1',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other2',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other3',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.unknown',
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.thousandHa',
          colSpan: 10,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.areaWithForestLandDegradation.${variable}`,
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
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const tableSpec2 = TableSpecFactory.newInstance({
  name: section.tables.table_2_5oth,
  secondary: true,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.nA',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other1',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other2',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.areaWithForestLandDegradation.other3',
        }),
      ],
    }),

    RowSpecFactory.newDataInstance({
      labelKey: 'panEuropean.areaWithForestLandDegradation.otherNames',
      mainCategory: true,
      cols: [
        ColSpecFactory.newTextInstance({}),
        ColSpecFactory.newTextInstance({}),
        ColSpecFactory.newTextInstance({}),
      ],
    }),
  ],
})

const areaWithForestLandDegradation = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec1, tableSpec2] }],
})

export default areaWithForestLandDegradation
