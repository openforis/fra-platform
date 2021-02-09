import PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['5'].children['51']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_20].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_5_1,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'soil_water_and_other_forest_ecosystem_functions',
    'infrastructure_and_managed_natural_resources',
    'total',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.protectiveForestsMCPFEClass31000ha',
          [SectionSpec.KEYS_COL.colSpan]: 3,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.soil_water_and_other_forest_ecosystem_functions',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.infrastructure_and_managed_natural_resources',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total',
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW
            .labelKey]: `panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const protectiveForestsSoilWaterAndOtherEcosystemFunctions = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default protectiveForestsSoilWaterAndOtherEcosystemFunctions
