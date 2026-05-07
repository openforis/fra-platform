import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { validateDescriptionText } from './validateDescriptionText'

type DescriptionValidationUpdate = {
  descriptionName: CommentableDescriptionName
  sectionName: SectionName
  value: CommentableDescriptionValue
}

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<DescriptionValidationUpdate>
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, cycle, descriptions } = props

  // TODO: const cachedValidations = ValidationRedisRepository.getDescriptionValidations

  const cachedValidations = {} as RecordDescriptionValidations

  descriptions.forEach((description) => {
    const { descriptionName, sectionName } = description
    const sectionValidations = cachedValidations[sectionName] ?? {}
    const textValidation = validateDescriptionText({ assessment, cycle, ...description })
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
  })

  // TODO: await ValidationRedisRepository.setDescriptionValidations
}
