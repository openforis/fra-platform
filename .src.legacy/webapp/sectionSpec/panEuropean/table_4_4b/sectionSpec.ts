import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

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

const variablesMappings: Record<string, string> = {
  _01: VARIABLES._01,
  _02: VARIABLES._02,
  _03: VARIABLES._03,
  _04: VARIABLES._04,
  _05: VARIABLES._05,
  _06: VARIABLES._06,
  _07: VARIABLES._07,
  _08: VARIABLES._08,
  _09: VARIABLES._09,
  _10: VARIABLES._10,
  _11: VARIABLES._11,
  _12: VARIABLES._12,
  _13: VARIABLES._13,
  _14: VARIABLES._14,
  _15: VARIABLES._15,
  _16: VARIABLES._16,
  _17: VARIABLES._17,
  _18: VARIABLES._18,
  _19: VARIABLES._19,
  _20: VARIABLES._20,
}

const years = [...PanEuropean.years05_15]

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_4_4b,
  columnsExport: [
    'scientific_name_of_introduced_tree_species',
    'forest_area_occupied_2005',
    'forest_area_occupied_2010',
    'forest_area_occupied_2015',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies4_4b.category',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies4_4b.scientificNameOfIntroducedTreeSpecies',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.introducedTreeSpecies4_4b.forestAreaOccupied1000Ha',
          colSpan: years.length,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          labelKey: `${year}`,
        })
      ),
    }),

    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.introducedTreeSpecies4_4b.${variable}`,
        cols: [ColSpecFactory.newTextInstance({}), ...years.map(() => ColSpecFactory.newDecimalInstance({}))],
      })
    ),
  ],
})

const introducedTreeSpecies44b = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default introducedTreeSpecies44b
