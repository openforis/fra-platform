import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'

const section = PanEuropean.sections['1'].children['11a']

const variables = [
  'forest',
  '_of_which_available_for_wood_supply',
  'other_wooded_land',
  'total_forest_and_other_wooded_land',
  'other_land',
  '_of_which_with_tree_cover',
]

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_1a,
  unit: Unit.haThousand,
  columnsExport: ['area'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestArea.categoryYear',
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestArea.area1000Ha',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.forestArea.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [ColSpecFactory.newDecimalInstance({})],
        })
      )
    ),
  ],
})

const forestArea = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestArea
