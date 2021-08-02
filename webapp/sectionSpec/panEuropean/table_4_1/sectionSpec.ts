import { PanEuropean } from '@core/assessment'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['4'].children['41']

const variables = ['forest', 'other_wooded_land', 'total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_4_1,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.haThousand,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'area_with_number_of_tree_species_occurring_1',
    'area_with_number_of_tree_species_occurring_2_3',
    'area_with_number_of_tree_species_occurring_4_5',
    'area_with_number_of_tree_species_occurring_6_pl',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.treeSpeciesComposition.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring1000ha',
          [SectionSpec.KEYS_COL.colSpan]: 4,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring1',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring2_3',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring4_5',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.treeSpeciesComposition.areaWithNumberOfTreeSpeciesOccurring6_pl',
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.treeSpeciesComposition.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
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

const treeSpeciesComposition = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default treeSpeciesComposition
