import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['44a']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_4a,
  unit: Unit.haThousand,
  columnsExport: ['total', '_of_which_invasive'],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies.areaOfStandsDominatedByIntroducedTreeSpecies1000ha',
          colSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies.total',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies._of_which_invasive',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map(
        (year) =>
          !['other_wooded_land_2020', 'total_forest_and_other_wooded_land_2020'].includes(`${variable}_${year}`) &&
          RowSpecFactory.newDataInstance({
            labelKey: `panEuropean.introducedTreeSpecies.${variable}`,
            labelParams: { year },
            variableExport: `${variable}_${year}`,
            cols: [ColSpecFactory.newDecimalInstance({}), ColSpecFactory.newDecimalInstance({})],
          })
      )
    ),
  ],
})

const introducedTreeSpecies = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default introducedTreeSpecies
