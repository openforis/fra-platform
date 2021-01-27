// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['69']
const tj = 'tj'
const _1000MetricTonnesDryMatter = '_1000MetricTonnesDryMatter'
const total_primary_energy_supply = 'total_primary_energy_supply'
const total_renewable_energy_supply = 'total_renewable_energy_supply'
const of_which_imported = 'of_which_imported'
const variables = [
  total_primary_energy_supply,
  total_renewable_energy_supply,
  'total_energy_supply_from_wood',
  'energy_from_direct_wood_fibre_sources',
  'of_which_from_forests',
  'of_which_from_other_wooded_land',
  'energy_from_co_products',
  'of_which_solid_residues',
  'energy_from_processed_wood_based_fuels',
  of_which_imported,
  'energy_from_post_consumer_recovered_wood',
  'energy_from_unknown_unspecified_sources',
]
const variablesMappings = {
  total_primary_energy_supply: (SectionSpec.VARIABLES as any).total_primary_energy_supply,
  total_renewable_energy_supply: (SectionSpec.VARIABLES as any).total_renewable_energy_supply,
  total_energy_supply_from_wood: (SectionSpec.VARIABLES as any).total_energy_supply_from_wood,
  energy_from_direct_wood_fibre_sources: (SectionSpec.VARIABLES as any).energy_from_direct_wood_fibre_sources,
  of_which_from_forests: (SectionSpec.VARIABLES as any).of_which_from_forests,
  of_which_from_other_wooded_land: (SectionSpec.VARIABLES as any).of_which_from_other_wooded_land,
  energy_from_co_products: (SectionSpec.VARIABLES as any).energy_from_co_products,
  of_which_solid_residues: (SectionSpec.VARIABLES as any).of_which_solid_residues,
  energy_from_processed_wood_based_fuels: (SectionSpec.VARIABLES as any).energy_from_processed_wood_based_fuels,
  of_which_imported: (SectionSpec.VARIABLES as any).of_which_imported,
  energy_from_post_consumer_recovered_wood: (SectionSpec.VARIABLES as any).energy_from_post_consumer_recovered_wood,
  energy_from_unknown_unspecified_sources: (SectionSpec.VARIABLES as any).energy_from_unknown_unspecified_sources,
}
const years = [...PanEuropean.years07_15]
const categories = [tj, _1000MetricTonnesDryMatter]
const mainCategories = variables.slice(0, 3)
const subcategories = variables.filter((item) => item.includes('of_which'))
const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_9,
  // @ts-expect-error ts-migrate(2550) FIXME: Property 'flatMap' does not exist on type 'any[]'.... Remove this comment to see the full error message
  [SectionSpec.KEYS_TABLE.columnsExport]: years.flatMap((year: any) =>
    categories.map((category) => `_${year}_${category}`)
  ),
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.totalEnergySupplyFromWood.category',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        ...years.map((year) =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
            [SectionSpec.KEYS_COL.colSpan]: categories.length,
          })
        ),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years
        .map(() =>
          categories.map((category) =>
            SectionSpec.newColHeader({
              [SectionSpec.KEYS_COL.labelKey]: `panEuropean.totalEnergySupplyFromWood.${category}`,
            })
          )
        )
        // @ts-expect-error ts-migrate(2550) FIXME: Property 'flat' does not exist on type 'any[][]'. ... Remove this comment to see the full error message
        .flat(),
    }),
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'flatMap' does not exist on type 'string[... Remove this comment to see the full error message
    ...variables.flatMap((variable: any) =>
      SectionSpec.newRowData({
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.totalEnergySupplyFromWood.${variable}`,
        [SectionSpec.KEYS_ROW.mainCategory]: !!mainCategories.includes(variable),
        [SectionSpec.KEYS_ROW.subcategory]: !!subcategories.includes(variable),
        [SectionSpec.KEYS_ROW.cols]: years
          .map(() =>
            categories.map((category) => {
              switch (variable) {
                case total_primary_energy_supply:
                case total_renewable_energy_supply:
                  return category === tj ? SectionSpec.newColDecimal() : SectionSpec.newColPlaceholder()
                case of_which_imported:
                  return category === _1000MetricTonnesDryMatter
                    ? SectionSpec.newColDecimal()
                    : SectionSpec.newColPlaceholder()
                default:
                  return SectionSpec.newColDecimal()
              }
            })
          )
          // @ts-expect-error ts-migrate(2550) FIXME: Property 'flat' does not exist on type 'any[][]'. ... Remove this comment to see the full error message
          .flat(),
      })
    ),
  ],
})
const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})
const totalEnergySupplyFromWood = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})
export default totalEnergySupplyFromWood
