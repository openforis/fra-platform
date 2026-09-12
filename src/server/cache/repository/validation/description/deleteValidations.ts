import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  sectionNames: Array<SectionName>
}

export const deleteValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, sectionNames } = props

  if (Objects.isEmpty(sectionNames)) return

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Validation.descriptions })

  await redis.hdel(key, ...sectionNames)
}
