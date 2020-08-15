import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['11b']

const variables = [
  'predominantly_coniferous_forest',
  'predominantly_broadleaved_forest',
  'mixed_forest',
]

const variablesMappings = {
  predominantlyConiferousForest: SectionSpec.VARIABLES.predominantly_coniferous_forest,
  predominantlyBroadleavedForest: SectionSpec.VARIABLES.predominantly_broadleaved_forest,
  mixedForest: SectionSpec.VARIABLES.mixed_forest,
}

const years = [...PanEuropean.years90_20]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_1_1b,
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_1990',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_2000',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_2005',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_2010',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_2015',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'forest_area_2020',

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaByForestTypes.category',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestAreaByForestTypes.forestArea1000Ha',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        })
      ]
    }),
    /* OFF Based on 2d
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          //ORIG [SectionSpec.KEYS_COL.label]: year,
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    }),
    */
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 1990,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2000,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2005,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2010,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2015,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 2020,
        }),
      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.forestAreaByForestTypes.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestAreaByForestTypes = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestAreaByForestTypes
