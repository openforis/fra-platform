import PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['13a2']

const variables = [
  'forest_available_for_wood_supply_even_aged_stands_of_which',
  'predominantly_coniferous_forest',
  'predominantly_broadleaved_forest',
  'mixed_forest',
]

const years = [...PanEuropean.years90_15].reverse()
const subcategories = variables.slice(1)

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_1_3a2,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'total_volume',
    'regeneration_phase',
    'intermediate_phase',
    'mature_phase',
    'unspecified',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.developmentPhases1000ha',
          [SectionSpec.KEYS_COL.colSpan]: 4,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified',
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW
            .labelKey]: `panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.subcategory]: !!subcategories.includes(variable),
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
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

const ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply
