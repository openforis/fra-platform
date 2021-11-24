import { ColSpecFactory } from '../../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../../sectionSpec/rowSpecFactory'
import { TableSpecFactory } from '../../../../sectionSpec/tableSpecFactory'

import primaryDesignatedManagementObjective from '@server/dataTable/mappings/fra/primaryDesignatedManagementObjective'
import section from '../section'

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.primaryDesignatedManagementObjective,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'contentCheck.primaryDesignatedManagementObjective.title',
          rowSpan: 2,
          left: true,
        }),
      ],
    }),

    RowSpecFactory.newHeaderInstance({
      cols: primaryDesignatedManagementObjective.columns.map(({ name }) =>
        ColSpecFactory.newHeaderInstance({
          label: name,
        })
      ),
    }),

    ...primaryDesignatedManagementObjective.rows.names.map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `contentCheck.primaryDesignatedManagementObjective.${variable}`,
        variableExport: `${variable}`,
        cols: primaryDesignatedManagementObjective.columns.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),
  ],
})

export default tableSpec
