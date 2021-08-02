import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

import periodicChangeRate from '@common/model/dataTable/contentCheck/periodicChangeRate'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.periodicChangeRate,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.periodicChangeRate.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: periodicChangeRate.columns.map(({ name }) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...periodicChangeRate.rows.names.map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.periodicChangeRate.${variable}`,
        variableExport: `${variable}`,
        cols: periodicChangeRate.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})
export default tableSpec
