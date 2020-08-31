import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['61']

const variables = [
  'in_public_ownership',
  'in_private_ownership',
  'other_types_of_ownership_unknown',
]

const years = [...PanEuropean.years90_15].reverse();

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_1,
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total_forest_area'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['total_number_of_holdings'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['less_10_ha_area'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['less_10_ha_number'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_11_500_ha_area'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['_11_500_ha_number'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['more_500_ha_area'],
  [SectionSpec.KEYS_TABLE.columnsExport]: ['more_500_ha_number'],

  [SectionSpec.KEYS_TABLE.rows]: [
    // row header
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.total_forest_area',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.total_number_of_holdings',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.areaAndNumberOfForestHoldingsInSizeClasses',
          [SectionSpec.KEYS_COL.colSpan]: 6,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.less10ha',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings._11_500ha',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.more500ha',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.less_10_ha_area',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.less_10_ha_number',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings._11_500_ha_area',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings._11_500_ha_number',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.more_500_ha_area',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.forestHoldings.more_500_ha_number',
        }),
      ],
    }),

    // rows data
    ...variables.flatMap((variable) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.forestHoldings.${variable}`,
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
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const forestHoldings = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default forestHoldings
