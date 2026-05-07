import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { validateDescriptionText } from './validateDescriptionText'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { descriptionName, sectionName } = props

  // TODO: const cachedValidations = ValidationRedisRepository.getDescriptionValidations

  const cachedValidations = {} as RecordDescriptionValidations
  const sectionValidations = cachedValidations[sectionName] ?? {}
  const textValidation = validateDescriptionText(props)
  // TODO: Validate data sources and store results under sectionValidations.dataSources.

  if (!Objects.isEmpty(textValidation)) {
    sectionValidations.descriptions ??= {}
    sectionValidations.descriptions[descriptionName] = textValidation
  } else {
    Objects.unset(sectionValidations, ['descriptions', descriptionName])

    if (Objects.isEmpty(sectionValidations.descriptions)) {
      Objects.unset(sectionValidations, ['descriptions'])
    }
  }

  // TODO: await ValidationRedisRepository.setDescriptionValidations
}
