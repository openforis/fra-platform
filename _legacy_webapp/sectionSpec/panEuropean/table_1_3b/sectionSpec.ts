import { PanEuropean } from '@core/assessment'

import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'

const section = PanEuropean.sections['1'].children['13b']

const variables = ['forest_uneven_aged_stands', '_of_which_forest_available_for_wood_supply']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.table_1_3b,
  columnsExport: [
    'area',
    'total_volume',
    'less_or_equal_20_cm',
    '_21_40_cm',
    '_41_60_cm',
    'greater_60_cm',
    'unspecified',
  ],

  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.categoryYear',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.area',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.total_volume',
          rowSpan: 2,
        }),

        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.volumeByDiameterClasses1000mob', // ???
          colSpan: 5,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.less_or_equal_20_cm',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._21_40_cm',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._41_60_cm',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.greater_60_cm',
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.unspecified',
        }),
      ],
    }),

    ...variables.flatMap((variable) =>
      years.map((year) =>
        RowSpecFactory.newDataInstance({
          labelKey: `panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.${variable}`,
          labelParams: { year },
          variableExport: `${variable}_${year}`,
          cols: [
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
            ColSpecFactory.newDecimalInstance({}),
          ],
        })
      )
    ),
  ],
})

const diameterDistributionAndTotalAreaUnevenAgedStands = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default diameterDistributionAndTotalAreaUnevenAgedStands
