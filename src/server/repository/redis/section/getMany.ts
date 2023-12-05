import { Assessment, Cycle, Section } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { getKeyCycle, Keys } from 'server/repository/redis/keys'
import { RedisData } from 'server/repository/redis/redisData'
import { _cacheSections } from 'server/repository/redis/section/_cacheSections'

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
