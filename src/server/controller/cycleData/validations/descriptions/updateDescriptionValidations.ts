import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidationsState } from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

import { validateDescription } from './validateDescription'

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

  const cachedValidations = {} as RecordDescriptionValidationsState
  const sectionValidations = cachedValidations[sectionName] ?? {}
  const descriptionValidation = validateDescription(props)

  if (!Objects.isEmpty(descriptionValidation)) {
    sectionValidations[descriptionName] = descriptionValidation
  } else {
    Objects.unset(sectionValidations, [descriptionName])
  }

  // TODO: await ValidationRedisRepository.setDescriptionValidations
}
