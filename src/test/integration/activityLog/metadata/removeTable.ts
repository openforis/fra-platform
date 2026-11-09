import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Table } from 'meta/assessment/table'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove table to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTable } = testContext

    await MetadataController.removeTable({ assessment, table: activityLogTable, user })

    // NB: The target is wrapped: { deletedTable }
    await ActivityLogAssertions.expectLastActivityLog<{ deletedTable: Table }>({
      assessment,
      message: ActivityLogMessage.tableDelete,
      section: 'table',
      target: { deletedTable: activityLogTable },
      user,
    })
  })
}
