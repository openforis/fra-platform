import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { TableDataController } from 'server/controller/cycleData/tableData'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

// Note: Importing nodes is only used in tools
export default (): void => {
  test('Expect import nodes to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const { colName } = colParams
    const tableName = tableParams.props.name
    const { variableName } = rowParams

    await TableDataController.massiveInsert({
      assessment,
      country,
      countryNodes: { [countryIso]: [{ colName, tableName, value: { raw: '40' }, variableName }] },
      cycle,
      user,
    })

    const node = await NodeRepository.getOneOrNone({ assessment, colName, countryIso, cycle, tableName, variableName })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.nodeValueImport,
      section: subSectionParams(cycle.uuid).props.name,
      target: node,
    })
  })
}
