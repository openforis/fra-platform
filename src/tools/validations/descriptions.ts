import { Country } from 'meta/area/country'
import {
  CommentableDescriptionName,
  DescriptionCountryValues,
  DescriptionIdentifier,
  DescriptionSectionValues,
} from 'meta/assessment/descriptionValue'
import { Objects } from 'utils/objects'

import { Logger } from 'server/utils/logger'
import { runDescriptionLinkValidation } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/worker'

import { AssessmentCycle, Failure } from './types'

type Props = AssessmentCycle & {
  country: Country
  descriptionsByCountry: DescriptionCountryValues
}

const _getIdentifiers = (sectionValues: DescriptionSectionValues): Array<DescriptionIdentifier> =>
  Object.entries(sectionValues).flatMap(([sectionName, descriptions]) =>
    Object.keys(descriptions).map((name) => ({ name: name as CommentableDescriptionName, sectionName }))
  )

export const validateDescriptions = async (props: Props): Promise<Array<Failure>> => {
  Logger.info('Start validateDescriptions')
  const { assessment, country, cycle, descriptionsByCountry } = props
  const { countryIso } = country
  const assessmentName = assessment.props.name
  const { name: cycleName } = cycle

  const sectionValues = descriptionsByCountry[countryIso]
  const descriptionIdentifiers = sectionValues ? _getIdentifiers(sectionValues) : []

  if (Objects.isEmpty(descriptionIdentifiers)) return []

  try {
    await runDescriptionLinkValidation({ assessment, countryIso, cycle, descriptionIdentifiers, notifyClients: false })
    Logger.info('Finish validateDescriptions')

    return []
  } catch (error) {
    Logger.error(`validateDescriptions failed for ${assessmentName}/${cycleName}/${countryIso}`)
    return [{ assessmentName, countryIso, cycleName, error }]
  }
}
