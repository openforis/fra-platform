import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { DescriptionValidations } from 'meta/assessment/validation/descriptionValidations'
import { Objects } from 'utils/objects'

import { getKeyCountry, Keys } from 'server/cache/repository/keys'
import { RedisData } from 'server/cache/repository/redisData'
import { getValidations } from 'server/cache/repository/validation/description/getValidations'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionValidations: RecordDescriptionValidations
  sectionNames: Array<SectionName>
}

export const updateDescriptionLinkValidations = async (props: Props): Promise<RecordDescriptionValidations> => {
  const { assessment, countryIso, cycle, descriptionValidations, sectionNames } = props

  const redis = RedisData.getInstance()
  const key = getKeyCountry({ assessment, countryIso, cycle, key: Keys.Data.validationDescriptions })
  const targetSectionNames = Array.from(new Set([...sectionNames, ...Object.keys(descriptionValidations)]))

  if (Objects.isEmpty(targetSectionNames)) return {}

  const currentValidations = await getValidations({
    assessment,
    countryIso,
    cycle,
    sectionNames: targetSectionNames,
  })
  const updatedDescriptionValidations: RecordDescriptionValidations = {}
  const validationsToSet: Record<string, string> = {}
  const sectionsToDelete: Array<string> = []

  targetSectionNames.forEach((sectionName) => {
    const current = currentValidations[sectionName] ?? {}
    const update = descriptionValidations[sectionName] ?? {}
    // Refresh link validation results while keeping the rest of the section state intact.
    const value = DescriptionValidations.mergeLinkValidations({ current, update })

    if (Objects.isEmpty(value)) {
      // Clear sections that are empty after the link validations are refreshed.
      sectionsToDelete.push(sectionName)
    } else {
      validationsToSet[sectionName] = JSON.stringify(value)
      updatedDescriptionValidations[sectionName] = value
    }
  })

  const setValidations = !Objects.isEmpty(validationsToSet) ? redis.hmset(key, validationsToSet) : undefined
  const deleteSections = !Objects.isEmpty(sectionsToDelete) ? redis.hdel(key, ...sectionsToDelete) : undefined

  await Promise.all([setValidations, deleteSections])

  return updatedDescriptionValidations
}
