import { ColSpecFactory } from '../../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../../sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '../../../../sectionSpec/tableSpecFactory'

import holderOfManagementRights from '@server/dataTable/mappings/fra/holderOfManagementRights'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.holderOfManagementRights,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.holderOfManagementRights.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: holderOfManagementRights.columns.map(({ name }) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...holderOfManagementRights.rows.names.map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.holderOfManagementRights.${variable}`,
        variableExport: `${variable}`,
        cols: holderOfManagementRights.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

export default tableSpec
