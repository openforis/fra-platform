import { Assessment, Cycle } from 'meta/assessment'

import { SectionRepository } from 'server/repository/assessment/section'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const _cacheSections = async (props: Props) => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Section.sections })

  const length = await redis.llen(key)
  if (length === 0) {
    const sections = await SectionRepository.getMany(props)
    await Promise.all(
      sections.map(async (section, sectionIndex) => {
        await redis.rpush(key, JSON.stringify(section))

        await Promise.all(
          section.subSections.map(async (subSection, subSectionIndex) => {
            const sectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsIndex })
            const subSectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.subSectionsIndex })
            await redis.hset(sectionIndexKey, new Map([[subSection.props.name, sectionIndex]]))
            await redis.hset(subSectionIndexKey, new Map([[subSection.props.name, subSectionIndex]]))
          })
        )
      })
    )
  }
}
