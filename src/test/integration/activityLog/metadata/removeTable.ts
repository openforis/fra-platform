import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove table to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTable } = testContext

    await MetadataController.removeTable({ assessment, table: activityLogTable, user })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.tableDelete,
      section: 'table',
      target: activityLogTable,
      user,
    })
  })
}
