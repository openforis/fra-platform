import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['12b']

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
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_1_2b,
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_1990',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_2000',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_2005',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_2010',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_2015',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_2020',

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockByForestType.category',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockByForestType.growingStockMillionM3OB',
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

    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.growingStockByForestType.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const growingStockByForestType = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default growingStockByForestType
