import { Assessment, Cycle, SectionName, TableSection } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'
import { SectionRedisRepository } from 'server/repository/redis/section/index'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionNames?: Array<string>
  force?: boolean
}

type RecordMetadata = Record<SectionName, Array<TableSection>>

const _getSectionNames = async (props: Pick<Props, 'assessment' | 'cycle'>): Promise<Array<SectionName>> => {
  const sections = await SectionRedisRepository.getMany(props)

  const sectionNames: Array<SectionName> = []
  sections.forEach((section) =>
    section.subSections.forEach((subSection) => {
      sectionNames.push(subSection.props.name)
    })
  )

  return sectionNames
}

export const getManyMetadata = async (props: Props, client: BaseProtocol = DB): Promise<RecordMetadata> => {
  const { assessment, cycle, sectionNames, force } = props

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsMetadata })

  if (force) {
    await redis.del(key)
  }

  const length = await redis.hlen(key)

  if (length === 0) {
    const sectionNamesCache = sectionNames ?? (await _getSectionNames({ assessment, cycle }))
    const propsMetadata = { assessment, cycle, sectionNames: sectionNamesCache }
    const sectionsMetadata = await SectionRepository.getManyMetadata(propsMetadata, client)
    await Promise.all(
      Object.entries(sectionsMetadata).map(async ([name, tableSections]) => {
        return redis.hset(key, name, JSON.stringify(tableSections))
      })
    )
  }

  const keys = sectionNames ?? (await redis.hkeys(key))
  const values: Array<string> = await redis.hmget(key, ...keys)

  return keys.reduce<RecordMetadata>((acc, key, index) => ({ ...acc, [key]: JSON.parse(values[index]) }), {})
}
