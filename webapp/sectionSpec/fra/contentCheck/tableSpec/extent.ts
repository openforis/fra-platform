import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

import extent from '@common/model/dataTable/contentCheck/extent'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.extent,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.extent.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: extent.columns.map(({ name }: any) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...extent.rows.names.map((variable: any) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.extent.${variable}`,
        variableExport: `${variable}`,
        cols: extent.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

export default tableSpec
