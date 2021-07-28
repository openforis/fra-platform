import { PanEuropean } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['3'].children['34']

const variables1 = ['_01st', '_02nd', '_03rd', '_04th', '_05th', '_06th', '_07th', '_08th', '_09th', '_10th']

const variables2 = ['remaining_total', 'total']

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

  remaining_total: 'remaining_total',
  total: 'total',
}

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_3_4,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'name_of_service_product',
    'unit',
    'service_provision_amount_of_service_product',
    'service_provision_value_1000_national_currency',
    'forest_service_category',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.rankValue',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.nameOfServiceProduct',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.unit',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.serviceProvision',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.forestServiceCategory',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.amountOfServiceProduct',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.marketedServices2015.value1000NationalCurrency',
        }),
      ],
    }),

    ...variables1.flatMap((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.marketedServices2015.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: [
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
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.marketedServices2015.${variable}`,
        [SectionSpec.KEYS_ROW.colSpan]: 4,
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColDecimal({
            [SectionSpec.KEYS_COL.idx]: 3,
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

const marketedServices2015 = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default marketedServices2015
