import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisDataClient } from 'server/service/redis/dataClient'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameCycleEntries = async (props: Props): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  const redis = RedisDataClient.getInstance()
  const sectionsKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sections })
  const sectionsKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sections })
  const sectionIndexKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sectionsIndex })
  const sectionIndexKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sectionsIndex })
  const subSectionIndexKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.subSectionsIndex })
  const subSectionIndexKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.subSectionsIndex })
  const sectionsMetadataKey = getKeyCycle({ assessment, cycle: cycleSource, key: Keys.Section.sectionsMetadata })
  const sectionsMetadataKeyNew = getKeyCycle({ assessment, cycle: cycleTarget, key: Keys.Section.sectionsMetadata })

  const keys: Array<[string, string]> = [
    [sectionsKey, sectionsKeyNew],
    [sectionIndexKey, sectionIndexKeyNew],
    [subSectionIndexKey, subSectionIndexKeyNew],
    [sectionsMetadataKey, sectionsMetadataKeyNew],
  ]

  await Promise.all(
    keys.map(async ([key, keyNew]) => {
      // rename only if exists
      const exists = await redis.exists(key)
      if (exists === 0) return

      await redis.rename(key, keyNew)
    })
  )
}
