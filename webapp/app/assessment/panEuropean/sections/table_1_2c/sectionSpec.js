import * as PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['1'].children['12c']

const variables = [
  'no1_ranked_in_terms_of_volume',
  'no2_ranked_in_terms_of_volume',
  'no3_ranked_in_terms_of_volume',
  'no4_ranked_in_terms_of_volume',
  'no5_ranked_in_terms_of_volume',
  'no6_ranked_in_terms_of_volume',
  'no7_ranked_in_terms_of_volume',
  'no8_ranked_in_terms_of_volume',
  'no9_ranked_in_terms_of_volume',
  'no10_ranked_in_terms_of_volume',
]

const variablesMappings = {
  no1RankedInTermsOfVolume: SectionSpec.VARIABLES.no1_ranked_in_terms_of_volume,
  no2RankedInTermsOfVolume: SectionSpec.VARIABLES.no2_ranked_in_terms_of_volume,
  no3RankedInTermsOfVolume: SectionSpec.VARIABLES.no3_ranked_in_terms_of_volume,
  no4RankedInTermsOfVolume: SectionSpec.VARIABLES.no4_ranked_in_terms_of_volume,
  no5RankedInTermsOfVolume: SectionSpec.VARIABLES.no5_ranked_in_terms_of_volume,
  no6RankedInTermsOfVolume: SectionSpec.VARIABLES.no6_ranked_in_terms_of_volume,
  no7RankedInTermsOfVolume: SectionSpec.VARIABLES.no7_ranked_in_terms_of_volume,
  no8RankedInTermsOfVolume: SectionSpec.VARIABLES.no8_ranked_in_terms_of_volume,
  no9RankedInTermsOfVolume: SectionSpec.VARIABLES.no9_ranked_in_terms_of_volume,
  no10RankedInTermsOfVolume: SectionSpec.VARIABLES.no10_ranked_in_terms_of_volume,
}

const years = [...PanEuropean.years90_20]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_1_2c,
  [SectionSpec.KEYS_TABLE.columnsExport]: 'scientific_name',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'common_name',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_1990',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_2000',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_2005',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_2010',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_2015',
  [SectionSpec.KEYS_TABLE.columnsExport]: 'growing_stock_in_forest_2020',

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockComposition.speciesName',
          [SectionSpec.KEYS_COL.colSpan]: 3,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockComposition.growingStockInForestMillionM3OB',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        })
      ]
    }),

   SectionSpec.newRowHeader({
    [SectionSpec.KEYS_ROW.cols]: [    
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockComposition.rank',
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockComposition.scientificName',
      }),
      SectionSpec.newColHeader({
        [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.growingStockComposition.commonName',
      }),    
      ...years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    ]
  }),

    ...variables.flatMap((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.growingStockComposition.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          ...years.map(() => SectionSpec.newColDecimal()),
        ]
      })
    ),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'panEuropean.growingStockComposition.remaining',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.remaining,
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.cols]: years.map((year, idx) =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'panEuropean.growingStockComposition.total',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.total,
      [SectionSpec.KEYS_ROW.colSpan]: 3,
      [SectionSpec.KEYS_ROW.cols]: years.map((year, idx) =>
        SectionSpec.newColDecimal({
          [SectionSpec.KEYS_COL.idx]: idx + 2,
        })
      ),
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const growingStockComposition = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default growingStockComposition
