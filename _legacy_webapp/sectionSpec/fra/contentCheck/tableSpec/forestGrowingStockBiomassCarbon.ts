import { ColSpecFactory } from '../../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../../sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '../../../../sectionSpec/tableSpecFactory'

import forestGrowingStockBiomassCarbon from '@common/model/dataTable/contentCheck/forestGrowingStockBiomassCarbon'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestGrowingStockBiomassCarbon,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: forestGrowingStockBiomassCarbon.columns.map(({ name }: any) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...forestGrowingStockBiomassCarbon.rows.names.map((variable: any) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.forestGrowingStockBiomassCarbon.${variable}`,
        variableExport: `${variable}`,
        cols: forestGrowingStockBiomassCarbon.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

export default tableSpec
