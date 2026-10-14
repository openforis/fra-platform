import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { _cacheSections } from 'server/cache/repository/section/_cacheSections'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getSectionNames = async (props: Props, client: BaseProtocol = DB): Promise<Array<SectionName>> => {
  const { assessment, cycle } = props

  const redis = RedisData.getInstance()

  await _cacheSections(props, client)

  const subSectionIndexKey = getKeyCycle({ assessment, cycle, key: Keys.Section.subSectionsIndex })
  return redis.hkeys(subSectionIndexKey)
}
