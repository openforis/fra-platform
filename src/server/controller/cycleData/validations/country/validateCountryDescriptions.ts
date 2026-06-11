import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { updateDescriptionValidations } from 'server/controller/cycleData/validations/descriptions/updateDescriptionValidations'
import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'

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

  const descriptions = Object.entries(countryDescriptions).flatMap<DescriptionLinkSource>(
    ([sectionName, sectionValues]) =>
      Object.entries(sectionValues).map<DescriptionLinkSource>(([name, value]) => ({
        countryIso,
        name: name as CommentableDescriptionName,
        sectionName,
        value,
      }))
  )

  if (Objects.isEmpty(descriptions)) return

  await updateDescriptionValidations({ assessment, country, cycle, descriptions, notifyClients: false })
}
