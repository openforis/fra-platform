import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeCycleEntries = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()
  const sectionsKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sections })
  const sectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsIndex })
  const subSectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.subSectionsIndex })
  const sectionsMetadataKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsMetadata })

  await redis.del(sectionsKey)
  await redis.del(sectionIndexKey)
  await redis.del(subSectionIndexKey)
  await redis.del(sectionsMetadataKey)
}
