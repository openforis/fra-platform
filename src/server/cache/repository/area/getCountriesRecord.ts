import { Areas } from 'meta/area/areas'
import { RecordCountries } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { _cacheCountries } from 'server/cache/repository/area/cacheCountries'
import { getKeyCycle, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIsos: Array<CountryIso>
}

export const getCountriesRecord = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountries> => {
  const { assessment, countryIsos, cycle } = props
  const record = {} as RecordCountries

  if (countryIsos.length === 0) {
    return record
  }

  const redis = RedisData.getInstance()
  const key = getKeyCycle({ assessment, cycle, key: Keys.Area.country })
  const cached = await redis.hmget(key, ...countryIsos)

  const missingIsos: Array<CountryIso> = []
  countryIsos.forEach((countryIso, index) => {
    if (!Areas.isISOCountry(countryIso)) return

    const cachedCountry = cached[index]
    if (Objects.isEmpty(cachedCountry)) {
      missingIsos.push(countryIso)
    } else {
      record[countryIso] = JSON.parse(cachedCountry)
    }
  })

  if (missingIsos.length > 0) {
    const countries = await _cacheCountries({ assessment, countryIsos: missingIsos, cycle }, client)
    missingIsos.forEach((countryIso) => {
      record[countryIso] = countries[countryIso]
    })
  }

  return record
}
