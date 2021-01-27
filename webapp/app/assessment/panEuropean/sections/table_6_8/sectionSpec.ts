// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['68']
const variables = [
  'exports_of_forest_products_quantity',
  'exports_of_forest_products_value',
  'imports_of_forest_products_quantity',
  'imports_of_forest_products_value',
]
const variablesMappings = {
  exportsOfForestProductsQuantity: (SectionSpec.VARIABLES as any).exports_of_forest_products_quantity,
  exportsOfForestProductsValue: (SectionSpec.VARIABLES as any).exports_of_forest_products_value,
  importsOfForestProductsQuantity: (SectionSpec.VARIABLES as any).imports_of_forest_products_quantity,
  importsOfForestProductsValue: (SectionSpec.VARIABLES as any).imports_of_forest_products_value,
}
const years = [...PanEuropean.years92_17]
const categYears = ['Category', ...years]
const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_8,
  [SectionSpec.KEYS_TABLE.columnsExport]: years.map((year) => `_${year}`),
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [...categYears].map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    }),
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'flatMap' does not exist on type 'string[... Remove this comment to see the full error message
    ...variables.flatMap((variable: any) =>
      SectionSpec.newRowData({
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.tradeInWood.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})
const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})
const tradeInWood = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})
export default tradeInWood
