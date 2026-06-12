import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  CommentableDescription,
  CommentableDescriptionName,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { updateDescriptionValidations } from 'server/controller/cycleData/validations/descriptions/updateDescriptionValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptionsByCountry: DescriptionCountryValues
}

export const validateCountryDescriptions = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptionsByCountry } = props
  const { countryIso } = country
  const countryDescriptions = descriptionsByCountry[countryIso] ?? {}

  const descriptions = Object.entries(countryDescriptions).flatMap<Omit<CommentableDescription, 'id'>>(
    ([sectionName, sectionValues]) =>
      Object.entries(sectionValues).map<Omit<CommentableDescription, 'id'>>(([name, value]) => ({
        countryIso,
        name: name as CommentableDescriptionName,
        sectionName,
        value,
      }))
  )

  if (Objects.isEmpty(descriptions)) return

  await updateDescriptionValidations({ assessment, country, cycle, descriptions, notifyClients: false })
}
