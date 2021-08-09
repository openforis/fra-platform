import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['45']

const variables1 = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const variables2 = ['coniferous', 'broadleaved']

const years1 = [...PanEuropean.years90_15].reverse()

const years2 = [...PanEuropean.years15]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_5,
  unit: Unit.cubicMeterPerHa,
  columnsExport: ['total', 'standing', 'lying'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.deadwood.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.deadwood.volumeOfDeadwoodM3Ha',
          colSpan: 3,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.deadwood.total',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.deadwood.standing',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.deadwood.lying',
        }),
      ],
    }),
    ...variables1.flatMap((variable) =>
      years1.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.deadwood.${variable}`,
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
    // Volume of deadwood in FOWL by species groups
    RowSpecFactory.newDataInstance({
      labelKey: 'panEuropean.deadwood.volumeOfDeadwoodInFOWLBySpeciesGroups',
      colSpan: 4,
      mainCategory: true,
    }),
    ...variables2.flatMap((variable) =>
      years2.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.deadwood.${variable}`,
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

const deadwood = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default deadwood
