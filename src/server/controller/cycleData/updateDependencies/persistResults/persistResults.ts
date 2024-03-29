import { ActivityLogMessage, Node } from 'meta/assessment'
import { User } from 'meta/user'

import { DB } from 'server/db'
import { NodeRepository } from 'server/repository/assessmentCycle/node'
import { ActivityLogDb, ActivityLogRepository } from 'server/repository/public/activityLog'
import { DataRedisRepository } from 'server/repository/redis/data'

import { ContextResult } from '../context'

type Props = {
  result: ContextResult
  user: User
}

export const persistResults = async (props: Props): Promise<void> => {
  const { result, user } = props
  const { assessment, cycle, nodes, nodeUpdates, nodesDb, rowsByColUuid } = result
  const { countryIso } = nodeUpdates

  if (nodesDb.length > 0) {
    await DB.tx(async (client) => {
      // 1. Insert calculated nodes into DB
      const nodesInsert = await NodeRepository.massiveInsert({ assessment, cycle, nodes: nodesDb }, client)

      // 2. Insert activity logs into DB
      const activityLogs = nodesInsert.map<ActivityLogDb<Node>>((target) => ({
        assessment_uuid: assessment.uuid,
        cycle_uuid: cycle.uuid,
        country_iso: countryIso,
        section: rowsByColUuid[target.colUuid].sectionName,
        message: ActivityLogMessage.nodeValueCalculatedUpdate,
        target,
        user_id: user.id,
      }))
      await ActivityLogRepository.massiveInsert({ activityLogs }, client)

      // 3. Update redis cache
      await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes })
    })
  }
}
