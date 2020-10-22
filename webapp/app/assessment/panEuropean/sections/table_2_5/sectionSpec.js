import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['2'].children['25']

const variables = [
  'forest',
  'other_wooded_land',
  'total_forest_and_other_wooded_land',
]

const years = [...PanEuropean.years90_15].reverse()

const tableSpec1 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_2_5,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total_area_of_degraded_land'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['grazing'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['repeated_fires'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['air_pollution'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['desertification'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['other_1'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['other_2'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['other_3'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['unknown'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['former_degraded_land_restored'],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.totalAreaOfDegradedLand',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.areaPrimarilyDegradedBy',
          [SectionSpec.KEYS_COL.colSpan]: 8,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.formerDegradedLandRestored',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.grazing',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.repeatedFires',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.airPollution',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.desertification',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other1',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other2',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other3',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.unknown',
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.thousandHa',
          [SectionSpec.KEYS_COL.colSpan]: 10,
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.areaWithForestLandDegradation.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
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

const tableSpec2 = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_2_5oth,
  [SectionSpec.KEYS_TABLE.secondary]: true,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.nA',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other1',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other2',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.areaWithForestLandDegradation.other3',
        }),
      ],
    }),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'panEuropean.areaWithForestLandDegradation.otherNames',
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColText(),
        SectionSpec.newColText(),
        SectionSpec.newColText(),
      ],
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec1, tableSpec2],
})

const areaWithForestLandDegradation = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default areaWithForestLandDegradation
