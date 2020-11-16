import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['44b']

const variables = [
  '_01',
  '_02',
  '_03',
  '_04',
  '_05',
  '_06',
  '_07',
  '_08',
  '_09',
  '_10',
  '_11',
  '_12',
  '_13',
  '_14',
  '_15',
  '_16',
  '_17',
  '_18',
  '_19',
  '_20',
]

const variablesMappings = {
  _01: SectionSpec.VARIABLES._01,
  _02: SectionSpec.VARIABLES._02,
  _03: SectionSpec.VARIABLES._03,
  _04: SectionSpec.VARIABLES._04,
  _05: SectionSpec.VARIABLES._05,
  _06: SectionSpec.VARIABLES._06,
  _07: SectionSpec.VARIABLES._07,
  _08: SectionSpec.VARIABLES._08,
  _09: SectionSpec.VARIABLES._09,
  _10: SectionSpec.VARIABLES._10,
  _11: SectionSpec.VARIABLES._11,
  _12: SectionSpec.VARIABLES._12,
  _13: SectionSpec.VARIABLES._13,
  _14: SectionSpec.VARIABLES._14,
  _15: SectionSpec.VARIABLES._15,
  _16: SectionSpec.VARIABLES._16,
  _17: SectionSpec.VARIABLES._17,
  _18: SectionSpec.VARIABLES._18,
  _19: SectionSpec.VARIABLES._19,
  _20: SectionSpec.VARIABLES._20,
}

const years = [...PanEuropean.years05_15]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_4b,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'scientific_name_of_introduced_tree_species',
    'forest_area_occupied_2005',
    'forest_area_occupied_2010',
    'forest_area_occupied_2015',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies4_4b.no',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.introducedTreeSpecies4_4b.scientificNameOfIntroducedTreeSpecies',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies4_4b.forestAreaOccupied1000Ha',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    }),

    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.introducedTreeSpecies4_4b.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColText(), ...years.map(() => SectionSpec.newColDecimal())],
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
