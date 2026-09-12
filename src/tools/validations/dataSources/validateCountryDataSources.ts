import {
  CommentableDescription,
  CommentableDescriptionName,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'

import { DataValidationService } from 'server/service/dataValidation'

import { CountryProps } from '../common/types'

type Props = CountryProps & { descriptionsByCountry: DescriptionCountryValues }

export const validateCountryDataSources = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptionsByCountry } = props
  const { countryIso } = country

  const descriptions = Object.entries(descriptionsByCountry[countryIso] ?? {}).flatMap<
    Omit<CommentableDescription, 'id'>
  >(([sectionName, sectionValues]) =>
    Object.entries(sectionValues).map<Omit<CommentableDescription, 'id'>>(([name, value]) => ({
      countryIso,
      name: name as CommentableDescriptionName,
      sectionName,
      value,
    }))
  )

  await DataValidationService.removeDescriptionValidations({ assessment, countryIso, cycle })

  await DataValidationService.validateDataSources({ assessment, country, cycle, descriptions, notifyClients: false })
}
