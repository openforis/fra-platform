import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid'

import { MetaCacheRedisRepository } from 'server/cache/repository/metaCache'

export type PropsMetaCacheCycle = { cycleName?: CycleName; cycleUuid?: UUID; metaCache?: boolean }
type Props = { assessment: Assessment } & PropsMetaCacheCycle

export const getAssessmentWithMetaCache = async (props: Props): Promise<Assessment> => {
  const { assessment, cycleName, cycleUuid, metaCache = false } = props

  if (metaCache) {
    let { cycles } = assessment
    if (cycleName) cycles = [Assessments.getCycle({ assessment, cycleName })]
    if (cycleUuid) cycles = [Assessments.getCycle({ assessment, cycleUuid })]

    await Promise.all(
      cycles.map(async (cycle) => {
        const metaCache = await MetaCacheRedisRepository.getMetaCache({ assessment, cycle })
        Objects.setInPath({ obj: assessment, path: ['metaCache', cycle.uuid], value: metaCache })
      })
    )
  }

  return assessment
}
