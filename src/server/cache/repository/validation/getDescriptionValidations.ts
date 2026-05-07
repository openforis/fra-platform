import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  sectionNames?: Array<SectionName>
}

const _parseDescriptionValidations = (value?: string | null): SectionDescriptionValidations => {
  if (!value) {
    return {}
  }

  return JSON.parse(value)
}

export const getDescriptionValidations = async (props: Props): Promise<RecordDescriptionValidations> => {
  const { assessment, countryIso, cycle, sectionNames } = props

  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationDescriptions })

  if (!Objects.isNil(sectionNames)) {
    if (sectionNames.length === 0) {
      return {}
    }

    const redis = RedisData.getInstance()
    const values = await redis.hmget(key, ...sectionNames)

    return sectionNames.reduce<RecordDescriptionValidations>((acc, sectionName, index) => {
      acc[sectionName] = _parseDescriptionValidations(values[index])
      return acc
    }, {})
  }

  const redis = RedisData.getInstance()
  const descriptionValidations = await redis.hgetall(key)

  return Object.entries(descriptionValidations).reduce<RecordDescriptionValidations>(
    (acc, [sectionName, validations]) => {
      acc[sectionName] = _parseDescriptionValidations(validations)
      return acc
    },
    {}
  )
}
