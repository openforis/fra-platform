import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { VARIABLES } from '@webapp/sectionSpec/variables'

const section = PanEuropean.sections['3'].children['34']

const variables1 = ['_01st', '_02nd', '_03rd', '_04th', '_05th', '_06th', '_07th', '_08th', '_09th', '_10th']

const variables2 = ['remaining_total', 'total']

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

  remaining_total: 'remaining_total',
  total: 'total',
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_3_4,
  columnsExport: [
    'name_of_service_product',
    'unit',
    'service_provision_amount_of_service_product',
    'service_provision_value_1000_national_currency',
    'forest_service_category',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.rankValue',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.nameOfServiceProduct',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.unit',
          rowSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.serviceProvision',
          colSpan: 2,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.forestServiceCategory',
          rowSpan: 2,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.amountOfServiceProduct',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.marketedServices2015.value1000NationalCurrency',
        }),
      ],
    }),

    ...variables1.flatMap((variable) =>
      RowSpecFactory.newDataInstance({
        variableExport: variablesMappings[variable],
        labelKey: `panEuropean.marketedServices2015.${variable}`,
        cols: [
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
        labelKey: `panEuropean.marketedServices2015.${variable}`,
        colSpan: 4,
        cols: [
          ColSpecFactory.newDecimalInstance({
            idx: 3,
          }),
          ColSpecFactory.newPlaceholderInstance({}),
        ],
      })
    ),
  ],
})

const marketedServices2015 = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default marketedServices2015
