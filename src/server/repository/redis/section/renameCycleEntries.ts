import { Assessment, Cycle } from 'meta/assessment'

import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameCycleEntries = async (props: Props): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  const redis = RedisData.getInstance()
  const sectionsKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sections })
  const sectionsKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sections })
  const sectionIndexKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sectionsIndex })
  const sectionIndexKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sectionsIndex })
  const subSectionIndexKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.subSectionsIndex })
  const subSectionIndexKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.subSectionsIndex })
  const sectionsMetadataKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sectionsMetadata })
  const sectionsMetadataKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sectionsMetadata })

  await redis.rename(sectionsKey, sectionsKeyNew)
  await redis.rename(sectionIndexKey, sectionIndexKeyNew)
  await redis.rename(subSectionIndexKey, subSectionIndexKeyNew)
  await redis.rename(sectionsMetadataKey, sectionsMetadataKeyNew)
}
