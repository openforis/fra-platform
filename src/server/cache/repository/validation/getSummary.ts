import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getSummary = async (props: Props): Promise<ValidationSummary | null> => {
  const { assessment, countryIso, cycle } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationsSummary })
  const summary = await redis.get(key)

  return summary ? JSON.parse(summary) : null
}
