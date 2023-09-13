import { Assessment, Cycle, Section } from 'meta/assessment'

import { getKey } from 'server/repository/redis/getKey'
import { REDIS } from 'server/repository/redis/index'
import { _cacheSections } from 'server/repository/redis/section/_cacheSections'
import { SectionKeys } from 'server/repository/redis/section/keys'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getMany = async (props: Props): Promise<Array<Section>> => {
  const { assessment, cycle } = props

  await _cacheSections({ assessment, cycle })

  const key = getKey({ assessment, cycle, key: SectionKeys.sections })
  const data = await REDIS.lrange(key, 0, -1)

  return data.map((value) => JSON.parse(value))
}
