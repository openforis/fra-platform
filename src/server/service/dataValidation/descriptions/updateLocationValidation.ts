import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { DescriptionLinkLocationPath } from 'meta/cycleData/links/descriptionLink'
import { LinkLocation } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { Objects } from 'utils/objects'

type Props = {
  descriptionValidations: RecordDescriptionValidations
  linkValidationMessage?: ValidationMessage
  location: LinkLocation
}

export const updateLocationValidation = (props: Props): void => {
  const { descriptionValidations, linkValidationMessage, location } = props

  if (!Links.isDescriptionLocation(location)) return

  let validation: Validation | undefined
  const { sectionName } = location
  const sectionValidation = (descriptionValidations[sectionName] ??= {})

  // For description.text
  if (Objects.isEqual(location.path, DescriptionLinkLocationPath.text)) {
    const { descriptionName } = location
    const descriptions = (sectionValidation.descriptions ??= {})
    validation = descriptions[descriptionName] ??= { valid: true }
  }

  // For dataSource.reference
  if (Objects.isEqual(location.path, DescriptionLinkLocationPath.dataSourceReference)) {
    const { uuid } = location
    if (Objects.isEmpty(uuid)) return

    const dataSources = (sectionValidation.dataSources ??= {})
    const dataSource = (dataSources[uuid] ??= {})
    validation = dataSource.reference ??= { valid: true }
  }

  if (!validation || linkValidationMessage === undefined) return

  // Append invalid message
  validation.valid = false
  validation.messages ??= []
  validation.messages.push(linkValidationMessage)
}
