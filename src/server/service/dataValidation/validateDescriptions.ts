import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription, CommentableDescriptionKey } from 'meta/assessment/descriptionValue'

import { LinksService } from 'server/service/links'

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

  // Validate data source fields first (not in parallel) to avoid cache race conditions.
  await validateDataSources({ assessment, country, cycle, descriptions, notifyClients })

  const descriptionKeys = descriptions.map<CommentableDescriptionKey>(({ name, sectionName }) => ({
    name,
    sectionName,
  }))

  await LinksService.enqueueDescriptionLinksValidation({
    assessment,
    countryIso,
    cycle,
    descriptionKeys,
    notifyClients,
  })
}
