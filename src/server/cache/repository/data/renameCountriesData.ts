import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisDataClient } from 'server/redis/dataClient'

type PropsCache = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameCountriesData = async (props: PropsCache): Promise<void> => {
  const { assessment, countryISOs, cycleSource, cycleTarget } = props

  const redis = RedisDataClient.getInstance()

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const key = getKeyCountry({ assessment, cycle: cycleSource, countryIso, key: Keys.Data.data })
      const keyNew = getKeyCountry({ assessment, cycle: cycleTarget, countryIso, key: Keys.Data.data })
      await redis.rename(key, keyNew)
    })
  )
}
