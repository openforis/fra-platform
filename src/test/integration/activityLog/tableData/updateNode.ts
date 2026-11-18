import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { TableDataController } from 'server/controller/cycleData/tableData'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update node to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const nodeKey = {
      colName: colParams.colName,
      tableName: tableParams.props.name,
      variableName: rowParams.variableName,
    }
    const sectionName = subSectionParams(cycle.uuid).props.name

    await TableDataController.persistNodeValues({
      assessment,
      country,
      cycle,
      nodeUpdates: {
        assessmentName: assessment.props.name,
        countryIso,
        cycleName: cycle.name,
        nodes: [{ ...nodeKey, value: { raw: '10' } }],
      },
      sectionName,
      user,
    })

    const node = await NodeRepository.getOneOrNone({ ...nodeKey, assessment, countryIso, cycle })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.nodeValueUpdate,
      section: sectionName,
      target: node,
    })
  })
}
