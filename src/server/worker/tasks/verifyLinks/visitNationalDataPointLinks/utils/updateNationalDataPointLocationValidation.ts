import { NDPValidation, RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { Validation, ValidationMessage } from 'meta/assessment/validation/validation'
import { LinkLocation } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'
import { NDPCommentLinkFields, NDPLinkField } from 'meta/cycleData/links/nationalDataPointLink'
import { Objects } from 'utils/objects'

type Props = {
  linkValidationMessage?: ValidationMessage
  location: LinkLocation
  nationalDataPointValidations: RecordNDPValidations
}

export const updateNationalDataPointLocationValidation = (props: Props): void => {
  const { linkValidationMessage, location, nationalDataPointValidations } = props

  if (!Links.isOriginalDataPointLocation(location)) return
  // Valid links are not saved in validation cache
  if (linkValidationMessage === undefined) return

  const validation: NDPValidation = (nationalDataPointValidations[location.odpUuid] ??= {})

  let fieldValidation: Validation | undefined

  // For comments (1a and 1b)
  const commentLinkField = NDPCommentLinkFields.find(({ linkField }) => linkField === location.odpSection)
  if (!Objects.isEmpty(commentLinkField)) {
    const comments = (validation.comments ??= {})
    fieldValidation = comments[commentLinkField.commentKey] ??= { valid: true }
  }

  // For dataSource.reference
  if (location.odpSection === NDPLinkField.dataSourceReferences) {
    const { dataSourceUuid } = location
    if (Objects.isEmpty(dataSourceUuid)) return

    const dataSources = (validation.dataSources ??= {})
    const dataSource = (dataSources[dataSourceUuid] ??= {})
    fieldValidation = dataSource.reference ??= { valid: true }
  }

  if (!fieldValidation) return

  // Append invalid message
  fieldValidation.valid = false
  fieldValidation.messages ??= []
  fieldValidation.messages.push(linkValidationMessage)
}
