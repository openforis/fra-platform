import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionValidations: RecordDescriptionValidations
  sectionNames: Array<SectionName>
}

export const setDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, descriptionValidations, sectionNames } = props

  if (Objects.isEmpty(sectionNames)) {
    return
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationDescriptions })

  const validationsToSet = sectionNames.reduce<Record<string, string>>((acc, sectionName) => {
    acc[sectionName] = JSON.stringify(descriptionValidations[sectionName] ?? {})
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)
}
