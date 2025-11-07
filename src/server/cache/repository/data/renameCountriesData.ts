import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type PropsCache = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameCountriesData = async (props: PropsCache): Promise<void> => {
  const { assessment, countryISOs, cycleSource, cycleTarget } = props

  const redis = RedisData.getInstance()

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle: cycleSource, countryIso, key: Keys.Data.data })
      const keyNew = getKeyCountry({ assessment, cycle: cycleTarget, countryIso, key: Keys.Data.data })
      await redis.rename(key, keyNew)
    })
  )
}
