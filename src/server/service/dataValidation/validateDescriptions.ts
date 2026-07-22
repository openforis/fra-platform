import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { visitDescriptionLinks } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/visitDescriptionLinks'

import { canValidateDataSources } from './canValidateDataSources'
import { validateDataSources } from './validateDataSources'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  notifyClients?: boolean
}

export const validateDescriptions = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions, notifyClients } = props
  const { countryIso } = country

  // Validate required data source fields first (not in parallel) to avoid cache race conditions.
  const dataSourceDescriptions = descriptions.filter((description) =>
    canValidateDataSources({ assessment, cycle, description })
  )
  if (!Objects.isEmpty(dataSourceDescriptions)) {
    await validateDataSources({
      assessment,
      country,
      cycle,
      descriptions: dataSourceDescriptions,
      notifyClients,
    })
  }

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
