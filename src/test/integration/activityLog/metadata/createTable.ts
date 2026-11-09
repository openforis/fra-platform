import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Table } from 'meta/assessment/table'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create table to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTableSection } = testContext

    const table = await MetadataController.createTable({
      assessment,
      table: { ...tableParams, tableSectionUuid: activityLogTableSection.uuid },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<Table>({
      assessment,
      message: ActivityLogMessage.tableCreate,
      section: 'table',
      target: { ...table, tableSectionUuid: activityLogTableSection.uuid },
      user,
    })

    testContext.activityLogTable = table
  })
}
