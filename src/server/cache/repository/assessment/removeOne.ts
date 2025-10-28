import { Promises } from 'utils/promises'

import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db/db'
import { CycleRedisRepository } from 'server/cache/repository/cycle'
import { getKeyAssessments, getKeyAssessmentsUuid } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
}

export const removeOne = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment } = props

  const redis = RedisData.getInstance()

  // delete assessment from redis
  await redis.hdel(getKeyAssessments(), assessment.props.name)
  await redis.hdel(getKeyAssessmentsUuid(), assessment.uuid)

  // delete cycles from redis
  await Promises.each(assessment.cycles, async (cycle) => {
    await CycleRedisRepository.removeOne({ assessment, cycle }, client)
  })
}
