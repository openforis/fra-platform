import { PanEuropean } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

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
const variablesMappings: Record<string, string> = {
  no1_ranked_in_terms_of_volume: VARIABLES.no1_ranked_in_terms_of_volume,
  no2_ranked_in_terms_of_volume: VARIABLES.no2_ranked_in_terms_of_volume,
  no3_ranked_in_terms_of_volume: VARIABLES.no3_ranked_in_terms_of_volume,
  no4_ranked_in_terms_of_volume: VARIABLES.no4_ranked_in_terms_of_volume,
  no5_ranked_in_terms_of_volume: VARIABLES.no5_ranked_in_terms_of_volume,
  no6_ranked_in_terms_of_volume: VARIABLES.no6_ranked_in_terms_of_volume,
  no7_ranked_in_terms_of_volume: VARIABLES.no7_ranked_in_terms_of_volume,
  no8_ranked_in_terms_of_volume: VARIABLES.no8_ranked_in_terms_of_volume,
  no9_ranked_in_terms_of_volume: VARIABLES.no9_ranked_in_terms_of_volume,
  no10_ranked_in_terms_of_volume: VARIABLES.no10_ranked_in_terms_of_volume,
}
const years = [...PanEuropean.years90_20]
const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_2c,
  columnsExport: [
    'scientific_name',
    'common_name',
    'growing_stock_in_forest_1990',
    'growing_stock_in_forest_2000',
    'growing_stock_in_forest_2005',
    'growing_stock_in_forest_2010',
    'growing_stock_in_forest_2015',
    'growing_stock_in_forest_2020',
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockComposition.speciesName',
          colSpan: 3,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockComposition.growingStockInForestMillionM3OB',
          colSpan: years.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockComposition.rank',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockComposition.scientificName',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.growingStockComposition.commonName',
        }),
        ...years.map((year) =>
          ColSpecFactory.newHeaderInstance({
            labelKey: `${year}`,
          })
        ),
      ],
    }),
    ...variables.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.growingStockComposition.${variable}`,
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ...years.map(() => ColSpecFactory.newDecimalInstance({})),
        ],
      })
    ),
    RowSpecFactory.newDataInstance({
      labelKey: 'panEuropean.growingStockComposition.remaining',
      variableExport: VARIABLES.remaining,
      colSpan: 3,
      cols: years.map((_, idx) =>
        ColSpecFactory.newDecimalInstance({
          idx: idx + 2,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'panEuropean.growingStockComposition.total',
      variableExport: VARIABLES.total,
      colSpan: 3,
      cols: years.map((_, idx) =>
        ColSpecFactory.newDecimalInstance({
          idx: idx + 2,
        })
      ),
    }),
  ],
})

const growingStockComposition = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})
export default growingStockComposition
