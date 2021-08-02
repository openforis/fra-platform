import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

import forestOwnership from '@server/dataTable/mappings/fra/forestOwnership'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.forestOwnership,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.forestOwnership.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: forestOwnership.columns.map(({ name }: any) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...forestOwnership.rows.names
      .filter((row) => !row.includes('of_which'))
      .map((variable) =>
        RowSpecFactory.newDataInstance({
          labelKey: `contentCheck.forestOwnership.${variable}`,
          variableExport: `${variable}`,
          cols: forestOwnership.columns.map(() => ColSpecFactory.newDecimalInstance({})),
        })
      ),
  ],
})

export default tableSpec
