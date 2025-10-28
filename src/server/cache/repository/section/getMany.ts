import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { _cacheSections } from 'server/cache/repository/section/_cacheSections'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Section>> => {
  const { assessment, cycle, force } = props

  const redis = RedisData.getInstance()

  await _cacheSections({ assessment, cycle, force }, client)

  const key = getKeyCycle({ assessment, cycle, key: Keys.Section.sections })
  const data = await redis.lrange(key, 0, -1)

  return data.map((value) => JSON.parse(value))
}
