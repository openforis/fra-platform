import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { TableSection } from 'meta/assessment/tableSection'
import { Objects } from 'utils/objects'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { SectionRedisRepository } from 'server/cache/repository/section/index'
import { BaseProtocol, DB } from 'server/db/db'
import { SectionRepository } from 'server/db/repository/assessment/section'
import { RedisDataClient } from 'server/service/redis/dataClient'

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
  const { assessment, cycle, force, sectionNames } = props

  const redis = RedisDataClient.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Section.sectionsMetadata })

  if (force) {
    await redis.del(key)
  }

  const length = await redis.hlen(key)

  if (length === 0) {
    // cache every section when the hash is empty, otherwise only the requested sections would be cached
    const sectionNamesCache = await _getSectionNames({ assessment, cycle })
    const propsMetadata = { assessment, cycle, sectionNames: sectionNamesCache }
    const sectionsMetadata = await SectionRepository.getManyMetadata(propsMetadata, client)
    const cacheEntries: Record<string, string> = {}
    Object.entries(sectionsMetadata).forEach(([name, tableSections]) => {
      cacheEntries[name] = JSON.stringify(tableSections)
    })

    if (!Objects.isEmpty(cacheEntries)) {
      await redis.hmset(key, cacheEntries)
    }
  }

  const keys = sectionNames ?? (await redis.hkeys(key))
  const values: Array<string> = Objects.isEmpty(keys) ? [] : await redis.hmget(key, ...keys)

  return keys.reduce<RecordMetadata>((acc, key, index) => ({ ...acc, [key]: JSON.parse(values[index]) }), {})
}
