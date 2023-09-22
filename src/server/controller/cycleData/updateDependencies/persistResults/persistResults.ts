import { ActivityLogMessage, Node, SectionName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { User } from 'meta/user'

import { DB } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/repository/public/activityLog'
import { DataRedisRepository } from 'server/repository/redis/data'

import { ContextResult } from '../context'

type Props = {
  result: ContextResult
  sectionName: SectionName
  user: User
}

export const persistResults = async (props: Props): Promise<void> => {
  const { result, sectionName, user } = props
  const { colUuids, data, nodeUpdates, nodesDb, tableNames } = result
  const { assessment, cycle, countryIso } = nodeUpdates

  await DB.tx(async (client) => {
    // 1. Delete old node from DB
    await NodeRepository.deleteMany({ assessment, cycle, countryIso, colUuids }, client)

    // 2. Insert calculated nodes into DB
    const nodes = await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)

    // 3. Insert activity logs into DB
    const activityLogs = nodes.map<ActivityLogDb<Node>>((target) => ({
      assessment_uuid: assessment.uuid,
      cycle_uuid: cycle.uuid,
      country_iso: countryIso,
      section: sectionName,
      message: ActivityLogMessage.nodeValueCalculatedUpdate,
      target,
      user_id: user.id,
    }))
    await ActivityLogRepository.massiveInsert({ activityLogs }, client)

    // 4. Update redis cache
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const cycleData = RecordAssessmentDatas.getCycleData({ assessmentName, cycleName, data })
    await Promise.all(
      tableNames.map((tableName) => {
        const propsCache = { assessment, cycle, countryIso, tableName, data: cycleData }
        return DataRedisRepository.updateCountryTable(propsCache)
      })
    )
  })
}
