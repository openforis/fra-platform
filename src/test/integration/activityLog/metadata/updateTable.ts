import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Table } from 'meta/assessment/table'

import { MetadataController } from 'server/controller/metadata'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update table to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogTable } = testContext
    const name = 'updatedName'

    const updatedTable = await MetadataController.updateTable({
      assessment,
      table: activityLogTable,
      tableProps: { name },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<Table>({
      assessment,
      message: ActivityLogMessage.tableUpdate,
      section: 'table',
      target: { ...updatedTable, props: { ...updatedTable.props, name } },
      user,
    })

    testContext.activityLogTable = updatedTable
  })
}
