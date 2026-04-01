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
  summary: ValidationSummary
}

export const setSummary = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, summary } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationsSummary })

  await redis.set(key, JSON.stringify(summary))
}
