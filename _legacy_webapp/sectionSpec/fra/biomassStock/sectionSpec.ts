import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = FRA.sections['2'].children.c
const { years } = FRA
const variables = ['aboveGround', 'belowGround', 'deadWood']
const variablesMappings: Record<string, string> = {
  aboveGround: VARIABLES.forest_above_ground,
  belowGround: VARIABLES.forest_below_ground,
  deadWood: VARIABLES.forest_deadwood,
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.biomassStock,
  unit: Unit.tonnesPerHa,
  columnsExport: years,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'biomassStock.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'biomassStock.tableHeader',
          colSpan: years.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          label: `${year}`,
        })
      ),
    }),
    ...variables.map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `biomassStock.${variable}`,
        variableExport: variablesMappings[variable],
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const biomassStock = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default biomassStock
