import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'

const section = PanEuropean.sections['4'].children['41']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_1,
  unit: Unit.haThousand,
  columnsExport: [
    'area_with_number_of_tree_species_occurring_1',
    'area_with_number_of_tree_species_occurring_2_3',
    'area_with_number_of_tree_species_occurring_4_5',
    'area_with_number_of_tree_species_occurring_6_pl',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring1000ha',
          colSpan: 4,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring1',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring2_3',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring4_5',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring6_pl',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.treeSpeciesComposition.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
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

const treeSpeciesComposition = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default treeSpeciesComposition
