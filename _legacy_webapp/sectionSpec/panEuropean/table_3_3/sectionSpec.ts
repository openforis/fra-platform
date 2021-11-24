import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = PanEuropean.sections['3'].children['33']

const variables1 = ['_01st', '_02nd', '_03rd', '_04th', '_05th', '_06th', '_07th', '_08th', '_09th', '_10th']

const variables2 = ['all_other_plant_products', 'all_other_animal_products', 'total']

const variablesMappings: Record<string, string> = {
  _01st: VARIABLES._01st,
  _02nd: VARIABLES._02nd,
  _03rd: VARIABLES._03rd,
  _04th: VARIABLES._04th,
  _05th: VARIABLES._05th,
  _06th: VARIABLES._06th,
  _07th: VARIABLES._07th,
  _08th: VARIABLES._08th,
  _09th: VARIABLES._09th,
  _10th: VARIABLES._10th,

  all_other_plant_products: 'all_other_plant_products',
  all_other_animal_products: 'all_other_animal_products',
  total: 'total',
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_3_3,
  columnsExport: [
    'name_of_groups_of_product',
    'key_species',
    'total_harvested_non_wood_goods_unit',
    'total_harvested_non_wood_goods_quantity',
    'market_value_1000_national_currency',
    'nwfp_category',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.rankValue',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.nameOfGroupsOfProduct',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.keySpecies',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.totalHarvestedNonWoodGoods',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.marketValue1000NationalCurrency',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.nwfpCategory',
          rowSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.unit',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.nonWoodGoods2015.quantity',
        }),
      ],
    }),

    ...variables1.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.nonWoodGoods2015.${variable}`,
        // labelKey: `panEuropean.nonWoodGoods2015.${variable}_`,
        cols: [
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newTextInstance({}),
          ColSpecFactory.newDecimalInstance({}),
          ColSpecFactory.newDecimalInstance({}),
          ColSpecFactory.newTextInstance({}),
        ],
      })
    ),
    ...variables2.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.nonWoodGoods2015.${variable}`,
        colSpan: 5,
        cols: [
          ColSpecFactory.newDecimalInstance({
            idx: 4,
          }),
          ColSpecFactory.newPlaceholderInstance({}),
        ],
      })
    ),
  ],
})

const nonWoodGoods2015 = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default nonWoodGoods2015
