import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const _cacheSections = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, force } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Section.sections })
  const sectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsIndex })
  const subSectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.subSectionsIndex })

  if (force) {
    await redis.del(key)
    await redis.del(sectionIndexKey)
    await redis.del(subSectionIndexKey)
  }

  const length = await redis.llen(key)
  if (length === 0) {
    const sections = await SectionRepository.getMany(props, client)
    await Promise.all(
      sections.map(async (section, sectionIndex) => {
        await redis.rpush(key, JSON.stringify(section))

        await Promise.all(
          section.subSections.map(async (subSection, subSectionIndex) => {
            await redis.hset(sectionIndexKey, new Map([[subSection.props.name, sectionIndex]]))
            await redis.hset(subSectionIndexKey, new Map([[subSection.props.name, subSectionIndex]]))
          })
        )
      })
    )
  }
}
