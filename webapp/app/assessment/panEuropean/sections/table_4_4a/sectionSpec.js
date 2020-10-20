import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['44a']

const variables = [
  'forest',
  'other_wooded_land',
  'total_forest_and_other_wooded_land',
]

const years = [...PanEuropean.years90_20].reverse();

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_4a,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_of_which_invasive'],
  
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies.areaOfStandsDominatedByIntroducedTreeSpecies1000ha',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies.total',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.introducedTreeSpecies._of_which_invasive',
        }),
      ],
    }),
    
    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.introducedTreeSpecies.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
  ],
})

// remove other_wooded_land_2020 & total_forest_and_other_wooded_land_2020 that are not available in the database
for (var i = 0; i < tableSpec.rows.length; ++i) {
  if (tableSpec.rows[i].variableExport === 'other_wooded_land_2020' || tableSpec.rows[i].variableExport === 'total_forest_and_other_wooded_land_2020')
    tableSpec.rows.splice(i, 1)
}

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const introducedTreeSpecies = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default introducedTreeSpecies
