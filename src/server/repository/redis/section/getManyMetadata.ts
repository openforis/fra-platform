import { Assessment, Cycle, SectionName, TableSection } from 'meta/assessment'

import { SectionRepository } from 'server/repository/assessment/section'
import { getKey } from 'server/repository/redis/getKey'
import { REDIS } from 'server/repository/redis/index'
import { SectionRedisRepository } from 'server/repository/redis/section/index'
import { SectionKeys } from 'server/repository/redis/section/keys'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionNames?: Array<string>
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

export const getManyMetadata = async (props: Props): Promise<RecordMetadata> => {
  const { assessment, cycle, sectionNames } = props

  const key = getKey({ assessment, cycle, key: SectionKeys.sectionsMetadata })

  const length = await REDIS.hlen(key)
  if (length === 0) {
    const sectionNames = await _getSectionNames({ assessment, cycle })
    const sectionsMetadata = await SectionRepository.getManyMetadata({ assessment, cycle, sectionNames })
    await Promise.all(
      Object.entries(sectionsMetadata).map(async ([name, tableSections]) => {
        return REDIS.hset(key, name, JSON.stringify(tableSections))
      })
    )
  }

  const keys = sectionNames ?? (await REDIS.hkeys(key))
  const values: Array<string> = await REDIS.hmget(key, ...keys)

  return keys.reduce<RecordMetadata>((acc, key, index) => ({ ...acc, [key]: JSON.parse(values[index]) }), {})
}
