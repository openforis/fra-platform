import { Assessment, Cycle, Section, SubSection } from 'meta/assessment'

import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'
import { _cacheSections } from 'server/repository/redis/section/_cacheSections'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName: string
}

export const getSubSection = async (props: Props): Promise<SubSection> => {
  const { assessment, cycle, sectionName } = props

  const redis = RedisData.getInstance()
  await _cacheSections({ assessment, cycle })

  const sectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsIndex })
  const sectionIndex = await redis.hget(sectionIndexKey, sectionName)

  const sectionsKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sections })
  const sectionData = await redis.lrange(sectionsKey, sectionIndex, sectionIndex)
  const section: Section = JSON.parse(sectionData[0])

  const subSectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.subSectionsIndex })
  const subSectionIndex = Number(await redis.hget(subSectionIndexKey, sectionName))
  return section.subSections[subSectionIndex]
}
