import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['13b']

const variables = [
  'forest_uneven_aged_stands',
  '_of_which_forest_available_for_wood_supply',
]

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_1_3b,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['area'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total_volume'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['less_or_equal_20_cm'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_21_40_cm'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_41_60_cm'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['greater_60_cm'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['unspecified'],

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.area',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.total_volume',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),

        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.volumeByDiameterClasses1000mob',   //???
          [SectionSpec.KEYS_COL.colSpan]: 5,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.less_or_equal_20_cm',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._21_40_cm',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._41_60_cm',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.greater_60_cm',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.unspecified',
        }),

      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.${variable}`,
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


          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const diameterDistributionAndTotalAreaUnevenAgedStands = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default diameterDistributionAndTotalAreaUnevenAgedStands
