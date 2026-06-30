import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  uuids: Array<UUID>
}

export const deleteValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, uuids } = props

  if (Objects.isEmpty(uuids)) return

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationNationalDataPoints })

  await redis.hdel(key, ...uuids)
}
