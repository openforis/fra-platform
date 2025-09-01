import { Objects } from 'utils/objects'

import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { CycleName, CycleUuid } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { getKeysAssessments } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  force: boolean
}

type AssessmentMap = Record<AssessmentName, Assessment>

const _setCache = async (props: { key: string; assessmentMap: AssessmentMap }): Promise<void> => {
  const { assessmentMap, key } = props
  const redis = RedisData.getInstance()
  await redis.hmset(
    key,
    ...Object.entries(assessmentMap).flatMap(([assessmentName, assessment]) => [
      assessmentName,
      JSON.stringify(assessment),
    ])
  )
}

const _cacheAssessments = async (client: BaseProtocol): Promise<AssessmentMap> => {
  const assessments = await AssessmentController.getAll({}, client)
  const assessmentMap = assessments.reduce<AssessmentMap>((acc, assessment) => {
    const indexesByName = assessment.cycles.reduce<Record<CycleName, number>>((acc, cycle, i) => {
      return Objects.setInPath({ path: [cycle.name], obj: acc, value: i })
    }, {})
    const indexesByUuid = assessment.cycles.reduce<Record<CycleUuid, number>>((acc, cycle, i) => {
      return Objects.setInPath({ path: [cycle.uuid], obj: acc, value: i })
    }, {})
    const value = { ...assessment, indexesByName, indexesByUuid }
    return Objects.setInPath({ path: [assessment.props.name], obj: acc, value })
  }, {})

  const key = getKeysAssessments()
  await _setCache({ key, assessmentMap })

  return assessmentMap
}

export const getAssessmentMap = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentMap> => {
  const { force = false } = props

  const redis = RedisData.getInstance()
  const key = getKeysAssessments()

  const cachedData = await redis.hgetall(key)
  const cachedKeys = Object.keys(cachedData)

  if (Objects.isEmpty(cachedKeys) || force) {
    return _cacheAssessments(client)
  }

  return Object.entries(cachedData).reduce<AssessmentMap>(
    (acc, [assessmentName, assessment]: [AssessmentName, string]) => {
      return Objects.setInPath({ path: [assessmentName], obj: acc, value: JSON.parse(assessment) })
    },
    {}
  )
}
