import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { TableDataController } from 'server/controller/cycleData/tableData'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect clear table to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const tableName = tableParams.props.name
    const sectionName = subSectionParams(cycle.uuid).props.name

    const nodes = await TableDataController.clearData({ assessment, country, cycle, sectionName, tableName, user })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.tableValuesClear,
      section: sectionName,
      target: { nodes, tableName },
    })
  })
}
