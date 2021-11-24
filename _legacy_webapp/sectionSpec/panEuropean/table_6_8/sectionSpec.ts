import { PanEuropean } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = PanEuropean.sections['6'].children['68']
const variables = [
  'exports_of_forest_products_quantity',
  'exports_of_forest_products_value',
  'imports_of_forest_products_quantity',
  'imports_of_forest_products_value',
]
const variablesMappings: Record<string, string> = {
  exports_of_forest_products_quantity: VARIABLES.exports_of_forest_products_quantity,
  exports_of_forest_products_value: VARIABLES.exports_of_forest_products_value,
  imports_of_forest_products_quantity: VARIABLES.imports_of_forest_products_quantity,
  imports_of_forest_products_value: VARIABLES.imports_of_forest_products_value,
}

const years = [...PanEuropean.years92_17]
const categYears = ['Category', ...years]
const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_8,
  columnsExport: years.map((year) => `_${year}`),
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [...categYears].map((year) =>
        ColSpecFactory.newHeaderInstance({
          labelKey: `${year}`,
          left: true,
        })
      ),
    }),
    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.tradeInWood.${variable}`,
        cols: years.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

const tradeInWood = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})
export default tradeInWood
