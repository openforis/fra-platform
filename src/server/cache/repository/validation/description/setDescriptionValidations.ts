import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordDescriptionValidations, SectionDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { getDescriptionValidations } from 'server/cache/repository/validation/description/getDescriptionValidations'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionValidations: RecordDescriptionValidations
}

const _mergeSectionDescriptionValidations = (
  current: SectionDescriptionValidations,
  update: SectionDescriptionValidations
): SectionDescriptionValidations => {
  const value: SectionDescriptionValidations = { ...current, ...update }

  if (current.descriptions || update.descriptions) {
    value.descriptions = { ...current.descriptions, ...update.descriptions }
  }

  return value
}

export const setDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, descriptionValidations } = props
  const sectionNames = Object.keys(descriptionValidations)

  if (Objects.isEmpty(sectionNames)) {
    return
  }

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationDescriptions })
  const currentValidations = await getDescriptionValidations({ assessment, countryIso, cycle, sectionNames })

  const validationsToSet = sectionNames.reduce<Record<string, string>>((acc, sectionName) => {
    const current = currentValidations[sectionName] ?? {}
    const update = descriptionValidations[sectionName]
    const value = _mergeSectionDescriptionValidations(current, update)

    acc[sectionName] = JSON.stringify(value)
    return acc
  }, {})

  await redis.hmset(key, validationsToSet)
}
