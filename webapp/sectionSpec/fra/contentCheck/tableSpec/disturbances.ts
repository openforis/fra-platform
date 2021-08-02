import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

import disturbances from '@server/dataTable/mappings/fra/disturbances'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.disturbances,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.disturbances.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: disturbances.columns.map(({ name }) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...disturbances.rows.names.map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.disturbances.${variable}`,
        variableExport: `${variable}`,
        cols: disturbances.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

export default tableSpec
