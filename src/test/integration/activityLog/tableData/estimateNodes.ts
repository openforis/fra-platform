import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { NodeValueEstimationMethod, NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'
import { UUIDs } from 'meta/uuid/uuids'

import { TableDataController } from 'server/controller/cycleData/tableData'
import { MetadataController } from 'server/controller/metadata'
import { NodeRepository } from 'server/db/repository/assessmentCycle/node'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { subSectionParams } from 'test/integration/mock/section'
import { colParams, rowParams, tableParams } from 'test/integration/mock/table'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect estimate nodes to write activity logs', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { countryIso } = country
    const { colName } = colParams
    const tableName = tableParams.props.name
    const { variableName } = rowParams
    const sectionName = subSectionParams(cycle.uuid).props.name

    const table = await MetadataController.getTable({ assessment, cycle, tableName })
    const estimation: NodeValuesEstimation = {
      createdAt: '',
      method: NodeValueEstimationMethod.linear,
      tableUuid: table.uuid,
      uuid: UUIDs.getUuid(),
      variables: { [variableName]: {} },
    }
    const value = { estimationUuid: estimation.uuid, raw: '30' }

    await TableDataController.persistNodeValuesEstimated({
      assessment,
      country,
      cycle,
      estimation,
      nodes: [{ colName, tableName, value, variableName }],
      sectionName,
      user,
    })

    const node = await NodeRepository.getOneOrNone({ assessment, colName, countryIso, cycle, tableName, variableName })
    const estimations = await TableDataController.getNodeValuesEstimations({ assessment, countryIso, cycle, tableName })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.nodeValueEstimate,
      section: sectionName,
      target: node,
    })
    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.nodeValuesEstimationCreate,
      section: sectionName,
      target: estimations[estimation.uuid],
    })
  })
}
