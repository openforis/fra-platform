// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['2'].children.d
const { years } = FRA
const variables = [
  'carbonAboveGroundBiomass',
  'carbonBelowGroundBiomass',
  'carbonDeadwood',
  'carbonLitter',
  'carbonSoil',
]

const variablesMappings = {
  carbonAboveGroundBiomass: SectionSpec.VARIABLES.carbon_forest_above_ground,
  carbonBelowGroundBiomass: SectionSpec.VARIABLES.carbon_forest_below_ground,
  carbonDeadwood: SectionSpec.VARIABLES.carbon_forest_deadwood,
  carbonLitter: SectionSpec.VARIABLES.carbon_forest_litter,
  carbonSoil: SectionSpec.VARIABLES.carbon_forest_soil,
}

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.carbonStock,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.tonnesPerHa,
  [SectionSpec.KEYS_TABLE.columnsExport]: years,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'carbonStock.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'carbonStock.tableHeader',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),
    ...variables.map((variable) =>
      SectionSpec.newRowData({
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `carbonStock.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.carbonStockSoilDepth,
  [SectionSpec.KEYS_TABLE.secondary]: true,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'carbonStock.soilDepthHeading',
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColDecimal()],
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1, tableSpec2],
})

const carbonStock = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default carbonStock
