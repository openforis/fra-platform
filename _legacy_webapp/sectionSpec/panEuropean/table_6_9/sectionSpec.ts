/* eslint-disable camelcase */
import { PanEuropean } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = PanEuropean.sections['6'].children['69']
const tj = 'tj'
const _1000MetricTonnesDryMatter = '_1000_metric_tonnes_dry_matter'
// eslint-disable-next-line camelcase
const total_primary_energy_supply = 'total_primary_energy_supply'
// eslint-disable-next-line camelcase
const total_renewable_energy_supply = 'total_renewable_energy_supply'
// eslint-disable-next-line camelcase
const of_which_imported = 'of_which_imported'
const variables = [
  // eslint-disable-next-line camelcase
  total_primary_energy_supply,
  // eslint-disable-next-line camelcase
  total_renewable_energy_supply,
  'total_energy_supply_from_wood',
  'energy_from_direct_wood_fibre_sources',
  'of_which_from_forests',
  'of_which_from_other_wooded_land',
  'energy_from_co_products',
  'of_which_solid_residues',
  'energy_from_processed_wood_based_fuels',
  // eslint-disable-next-line camelcase
  of_which_imported,
  'energy_from_post_consumer_recovered_wood',
  'energy_from_unknown_unspecified_sources',
]

const variablesMappings: Record<string, string> = {
  total_primary_energy_supply: VARIABLES.total_primary_energy_supply,
  total_renewable_energy_supply: VARIABLES.total_renewable_energy_supply,
  total_energy_supply_from_wood: VARIABLES.total_energy_supply_from_wood,
  energy_from_direct_wood_fibre_sources: VARIABLES.energy_from_direct_wood_fibre_sources,
  of_which_from_forests: VARIABLES.of_which_from_forests,
  of_which_from_other_wooded_land: VARIABLES.of_which_from_other_wooded_land,
  energy_from_co_products: VARIABLES.energy_from_co_products,
  of_which_solid_residues: VARIABLES.of_which_solid_residues,
  energy_from_processed_wood_based_fuels: VARIABLES.energy_from_processed_wood_based_fuels,
  of_which_imported: VARIABLES.of_which_imported,
  energy_from_post_consumer_recovered_wood: VARIABLES.energy_from_post_consumer_recovered_wood,
  energy_from_unknown_unspecified_sources: VARIABLES.energy_from_unknown_unspecified_sources,
}
const years = [...PanEuropean.years07_15]
const categories = [tj, _1000MetricTonnesDryMatter]
const mainCategories = variables.slice(0, 3)
const subcategories = variables.filter((item) => item.includes('of_which'))
const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_6_9,
  columnsExport: years.flatMap((year) => categories.map((category) => `${category}_${year}`)),
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.totalEnergySupplyFromWood.category',
          rowSpan: 2,
          left: true,
        }),
        ...years.map((year) =>
          ColSpecFactory.newHeaderInstance({
            label: `${year}`,
            colSpan: categories.length,
          })
        ),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years
        .map(() =>
          categories.map((category) =>
            ColSpecFactory.newHeaderInstance({
              labelKey: `panEuropean.totalEnergySupplyFromWood.${category}`,
            })
          )
        )
        .flat(),
    }),
    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.totalEnergySupplyFromWood.${variable}`,
        mainCategory: !!mainCategories.includes(variable),
        subcategory: !!subcategories.includes(variable),
        cols: years
          .map(() =>
            categories.map((category) => {
              switch (variable) {
                case total_primary_energy_supply:
                case total_renewable_energy_supply:
                  return category === tj
                    ? ColSpecFactory.newDecimalInstance({})
                    : ColSpecFactory.newPlaceholderInstance({})
                // eslint-disable-next-line camelcase
                case of_which_imported:
                  return category === _1000MetricTonnesDryMatter
                    ? ColSpecFactory.newDecimalInstance({})
                    : ColSpecFactory.newPlaceholderInstance({})
                default:
                  return ColSpecFactory.newDecimalInstance({})
              }
            })
          )
          .flat(),
      })
    ),
  ],
})

const totalEnergySupplyFromWood = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})
export default totalEnergySupplyFromWood
