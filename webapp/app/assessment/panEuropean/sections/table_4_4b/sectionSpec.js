import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['44b']

const variables = [
  'no1_scientific_name_of_introduced_tree_species_',
  'no2_scientific_name_of_introduced_tree_species_',
  'no3_scientific_name_of_introduced_tree_species_',
  'no4_scientific_name_of_introduced_tree_species_',
  'no5_scientific_name_of_introduced_tree_species_',
  'no6_scientific_name_of_introduced_tree_species_',
  'no7_scientific_name_of_introduced_tree_species_',
  'no8_scientific_name_of_introduced_tree_species_',
  'no9_scientific_name_of_introduced_tree_species_',
  'no10_scientific_name_of_introduced_tree_species_',
  'no11_scientific_name_of_introduced_tree_species_',
  'no12_scientific_name_of_introduced_tree_species_',
  'no13_scientific_name_of_introduced_tree_species_',
  'no14_scientific_name_of_introduced_tree_species_',
  'no15_scientific_name_of_introduced_tree_species_',
  'no16_scientific_name_of_introduced_tree_species_',
  'no17_scientific_name_of_introduced_tree_species_',
  'no18_scientific_name_of_introduced_tree_species_',
  'no19_scientific_name_of_introduced_tree_species_',
  'no20_scientific_name_of_introduced_tree_species_'
]

const variablesMappings = {
  no1ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no1_scientific_name_of_introduced_tree_species_,
  no2ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no2_scientific_name_of_introduced_tree_species_,
  no3ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no3_scientific_name_of_introduced_tree_species_,
  no4ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no4_scientific_name_of_introduced_tree_species_,
  no5ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no5_scientific_name_of_introduced_tree_species_,
  no6ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no6_scientific_name_of_introduced_tree_species_,
  no7ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no7_scientific_name_of_introduced_tree_species_,
  no8ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no8_scientific_name_of_introduced_tree_species_,
  no9ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no9_scientific_name_of_introduced_tree_species_,
  no10ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no10_scientific_name_of_introduced_tree_species_,
  no11ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no11_scientific_name_of_introduced_tree_species_,
  no12ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no12_scientific_name_of_introduced_tree_species_,
  no13ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no13_scientific_name_of_introduced_tree_species_,
  no14ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no14_scientific_name_of_introduced_tree_species_,
  no15ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no15_scientific_name_of_introduced_tree_species_,
  no16ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no16_scientific_name_of_introduced_tree_species_,
  no17ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no17_scientific_name_of_introduced_tree_species_,
  no18ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no18_scientific_name_of_introduced_tree_species_,
  no19ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no19_scientific_name_of_introduced_tree_species_,
  no20ScientificNameOfIntroducedTreeSpecies: SectionSpec.VARIABLES.no20_scientific_name_of_introduced_tree_species_,
}

const years = [...PanEuropean.years05_15]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_4b,
  [SectionSpec.KEYS_TABLE.columnsExport]: 'scientific_name_of_introduced_tree_species',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_occupied_2005',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_occupied_2010',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_occupied_2015',

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies4_4b.scientificNameOfIntroducedTreeSpecies',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies4_4b.forestAreaOccupied1000Ha',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        })
      ]
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    }),

    // rows data
    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.introducedTreeSpecies4_4b.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const introducedTreeSpecies4_4b = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default introducedTreeSpecies4_4b
