import { Objects } from 'utils/objects'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid'

import { BaseProtocol, DB } from 'server/db'
import { getOne } from 'server/repository/redis/assessment/getOne'
import { getKeyAssessmentsUuid } from 'server/repository/redis/keys'
import { MetaCacheRedisRepository } from 'server/repository/redis/metaCache'
import { RedisData } from 'server/repository/redis/redisData'

type PropsAssessment = { assessmentName: AssessmentName } | { uuid: UUID }
type PropsCycle = { cycleName: CycleName } | { cycleUuid: UUID }
type Props = PropsAssessment & PropsCycle & { metaCache?: boolean }

type Returned = { assessment: Assessment; cycle: Cycle }

export const getOneWithCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const redis = RedisData.getInstance()

  // 1. get assessment
  let assessmentName: AssessmentName
  if ('assessmentName' in props) {
    assessmentName = props.assessmentName
  } else if ('uuid' in props) {
    const keyAssessmentsUuid = getKeyAssessmentsUuid()
    assessmentName = await redis.hget(keyAssessmentsUuid, props.uuid)
  }
  const assessment: Assessment = await getOne({ assessmentName }, client)
  if (!assessment) {
    throw new Error(`Assessment not found ${JSON.stringify(props)}`)
  }

  // 2. get cycle
  let cycle: Cycle
  if ('cycleName' in props) {
    cycle = assessment.cycles[assessment.cycleIndexes.name[props.cycleName]]
  }
  if ('cycleUuid' in props) {
    cycle = assessment.cycles[assessment.cycleIndexes.uuid[props.cycleUuid]]
  }
  if (!cycle) {
    throw new Error(`Cycle not found ${JSON.stringify(props)}`)
  }

  // 3. get metaCache
  if ('metaCache' in props && props.metaCache) {
    const metaCache = await MetaCacheRedisRepository.getMetaCache({ assessment, cycle })
    Objects.setInPath({ obj: assessment, path: ['metaCache', cycle.uuid], value: metaCache })
  }

  // return assessment and cycle
  return { assessment, cycle }
}
