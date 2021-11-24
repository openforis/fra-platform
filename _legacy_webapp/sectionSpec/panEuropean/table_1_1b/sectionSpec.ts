import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = PanEuropean.sections['1'].children['11b']

const variables = ['predominantly_coniferous_forest', 'predominantly_broadleaved_forest', 'mixed_forest']

const variablesMappings: Record<string, string> = {
  predominantly_coniferous_forest: VARIABLES.predominantly_coniferous_forest,
  predominantly_broadleaved_forest: VARIABLES.predominantly_broadleaved_forest,
  mixed_forest: VARIABLES.mixed_forest,
}

const years = [...PanEuropean.years90_20]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_1b,
  unit: Unit.haThousand,
  columnsExport: [
    'forest_area_1990',
    'forest_area_2000',
    'forest_area_2005',
    'forest_area_2010',
    'forest_area_2015',
    'forest_area_2020',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaByForestTypes.category',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.forestAreaByForestTypes.forestArea1000Ha',
          colSpan: years.length,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          labelKey: `${year}`,
        })
      ),
    }),

    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.forestAreaByForestTypes.${variable}`,
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const forestAreaByForestTypes = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default forestAreaByForestTypes
