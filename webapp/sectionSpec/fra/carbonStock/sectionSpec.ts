import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = FRA.sections['2'].children.d
const { years } = FRA
const variables = [
  'carbonAboveGroundBiomass',
  'carbonBelowGroundBiomass',
  'carbonDeadwood',
  'carbonLitter',
  'carbonSoil',
]

const variablesMappings: Record<string, string> = {
  carbonAboveGroundBiomass: VARIABLES.carbon_forest_above_ground,
  carbonBelowGroundBiomass: VARIABLES.carbon_forest_below_ground,
  carbonDeadwood: VARIABLES.carbon_forest_deadwood,
  carbonLitter: VARIABLES.carbon_forest_litter,
  carbonSoil: VARIABLES.carbon_forest_soil,
}

const tableSpec1 = TableSpecFactory.newInstance({
  name: section.tables.carbonStock,
  unit: Unit.tonnesPerHa,
  columnsExport: years,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'carbonStock.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'carbonStock.tableHeader',
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
        variableExport: variablesMappings[variable],
        labelKey: `carbonStock.${variable}`,
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const tableSpec2 = TableSpecFactory.newInstance({
  name: section.tables.carbonStockSoilDepth,
  secondary: true,
  rows: [
    RowSpecFactory.newDataInstance({
      labelKey: 'carbonStock.soilDepthHeading',
      mainCategory: true,
      cols: [ColSpecFactory.newDecimalInstance({})],
    }),
  ],
})

const carbonStock = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec1, tableSpec2] }],
})

export default carbonStock
