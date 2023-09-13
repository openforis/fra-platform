import { Assessment, Cycle } from 'meta/assessment'

import { SectionRepository } from 'server/repository/assessment/section'
import { getKey } from 'server/repository/redis/getKey'
import { REDIS } from 'server/repository/redis/index'
import { SectionKeys } from 'server/repository/redis/section/keys'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const _cacheSections = async (props: Props) => {
  const { assessment, cycle } = props

  const key = getKey({ assessment, cycle, key: SectionKeys.sections })

  const length = await REDIS.llen(key)
  if (length === 0) {
    const sections = await SectionRepository.getMany(props)
    await Promise.all(
      sections.map(async (section, sectionIndex) => {
        await REDIS.rpush(key, JSON.stringify(section))

        await Promise.all(
          section.subSections.map(async (subSection, subSectionIndex) => {
            const sectionIndexKey = getKey({ assessment, cycle, key: SectionKeys.sectionsIndex })
            const subSectionIndexKey = getKey({ assessment, cycle, key: SectionKeys.subSectionsIndex })
            await REDIS.hset(sectionIndexKey, new Map([[subSection.props.name, sectionIndex]]))
            await REDIS.hset(subSectionIndexKey, new Map([[subSection.props.name, subSectionIndex]]))
          })
        )
      })
    )
  }
}
