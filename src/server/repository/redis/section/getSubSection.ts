import { Assessment, Cycle, Section, SubSection } from 'meta/assessment'

import { getKey } from 'server/repository/redis/getKey'
import { REDIS } from 'server/repository/redis/index'
import { _cacheSections } from 'server/repository/redis/section/_cacheSections'
import { SectionKeys } from 'server/repository/redis/section/keys'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName: string
}

export const getSubSection = async (props: Props): Promise<SubSection> => {
  const { assessment, cycle, sectionName } = props

  await _cacheSections({ assessment, cycle })

  const sectionIndexKey = getKey({ assessment, cycle, key: SectionKeys.sectionsIndex })
  const sectionIndex = await REDIS.hget(sectionIndexKey, sectionName)

  const sectionsKey = getKey({ assessment, cycle, key: SectionKeys.sections })
  const sectionData = await REDIS.lrange(sectionsKey, sectionIndex, 1)
  const section: Section = JSON.parse(sectionData[0])

  const subSectionIndexKey = getKey({ assessment, cycle, key: SectionKeys.subSectionsIndex })
  const subSectionIndex = Number(await REDIS.hget(subSectionIndexKey, sectionName))
  return section.subSections[subSectionIndex]
}
