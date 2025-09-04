import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'

import { MetaCacheRedisRepository } from 'server/repository/redis/metaCache'

type PropsWithMetaCache = {
  assessment: Assessment
  metaCache?: boolean
}

export const getAssessmentWithMetaCache = async (props: PropsWithMetaCache): Promise<Assessment> => {
  const { assessment, metaCache = false } = props

  if (metaCache) {
    await Promise.all(
      assessment.cycles.map(async (cycle) => {
        const metaCache = await MetaCacheRedisRepository.getMetaCache({ assessment, cycle })
        Objects.setInPath({ obj: assessment, path: ['metaCache', cycle.uuid], value: metaCache })
      })
    )
  }

  return assessment
}
