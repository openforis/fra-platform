import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { TableDataController } from 'server/controller/cycleData/tableData'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { calculatedRowParams, colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update node with a calculated dependant to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const { colName } = colParams
    const tableName = tableParams.props.name
    const sectionName = subSectionParams(cycle.uuid).props.name

    await TableDataController.persistNodeValues({
      assessment,
      country,
      cycle,
      nodeUpdates: {
        assessmentName: assessment.props.name,
        countryIso,
        cycleName: cycle.name,
        nodes: [{ colName, tableName, value: { raw: '20' }, variableName: rowParams.variableName }],
      },
      sectionName,
      user,
    })

    const { variableName } = calculatedRowParams(cycle.uuid)
    const calculatedNode = await NodeRepository.getOneOrNone({
      assessment,
      colName,
      countryIso,
      cycle,
      tableName,
      variableName,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.nodeValueCalculatedUpdate,
      section: sectionName,
      target: calculatedNode,
    })
  })
}
