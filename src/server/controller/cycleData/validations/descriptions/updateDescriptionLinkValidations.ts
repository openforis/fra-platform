import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'
import { visitDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/visitDescriptionLinks'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<DescriptionLinkSource>
  notifyClients?: boolean
}

export const updateDescriptionLinkValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions, notifyClients } = props
  const { countryIso } = country

  if (Objects.isEmpty(descriptions)) return

  const descriptionIdentifiers = descriptions.map<DescriptionIdentifier>(({ name, sectionName }) => ({
    name,
    sectionName,
  }))

  await visitDescriptionLinks({
    assessment,
    countryIso,
    cycle,
    descriptionIdentifiers,
    notifyClients,
  })
}
