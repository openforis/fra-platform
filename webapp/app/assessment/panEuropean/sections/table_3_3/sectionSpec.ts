import PanEuropean from '@common/assessment/panEuropean'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['3'].children['33']

const variables1 = ['_01st', '_02nd', '_03rd', '_04th', '_05th', '_06th', '_07th', '_08th', '_09th', '_10th']

const variables2 = ['all_other_plant_products', 'all_other_animal_products', 'total']

const variablesMappings: any = {
  _01st: SectionSpec.VARIABLES._01st,
  _02nd: SectionSpec.VARIABLES._02nd,
  _03rd: SectionSpec.VARIABLES._03rd,
  _04th: SectionSpec.VARIABLES._04th,
  _05th: SectionSpec.VARIABLES._05th,
  _06th: SectionSpec.VARIABLES._06th,
  _07th: SectionSpec.VARIABLES._07th,
  _08th: SectionSpec.VARIABLES._08th,
  _09th: SectionSpec.VARIABLES._09th,
  _10th: SectionSpec.VARIABLES._10th,

  all_other_plant_products: 'all_other_plant_products',
  all_other_animal_products: 'all_other_animal_products',
  total: 'total',
}

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_3_3,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'name_of_groups_of_product',
    'key_species',
    'total_harvested_non_wood_goods_unit',
    'total_harvested_non_wood_goods_quantity',
    'market_value_1000_national_currency',
    'nwfp_category',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.rankValue',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.nameOfGroupsOfProduct',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.keySpecies',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.totalHarvestedNonWoodGoods',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.marketValue1000NationalCurrency',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.nwfpCategory',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.unit',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.nonWoodGoods2015.quantity',
        }),
      ],
    }),

    ...variables1.flatMap((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.nonWoodGoods2015.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          SectionSpec.newColText(),
          SectionSpec.newColDecimal(),
          SectionSpec.newColDecimal(),
          SectionSpec.newColText(),
        ],
      })
    ),
    ...variables2.flatMap((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.nonWoodGoods2015.${variable}`,
        [SectionSpec.KEYS_ROW.colSpan]: 5,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColDecimal({
            [SectionSpec.KEYS_COL.idx]: 4,
          }),
          SectionSpec.newColPlaceholder(),
        ],
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const nonWoodGoods2015 = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default nonWoodGoods2015
