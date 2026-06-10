import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'

// Builds the initial description validation state before link results are applied. Description text starts valid;
// data source references also include required-field validation, so empty references are flagged.
export const buildInitialDescriptionValidations = (
  initialDescriptions: Array<DescriptionLinkSource>
): RecordDescriptionValidations => {
  const validations: RecordDescriptionValidations = {}

  initialDescriptions.forEach((description) => {
    const { name, sectionName, value } = description
    const sectionValidation = (validations[sectionName] ??= {})

    const descriptions = (sectionValidation.descriptions ??= {})
    descriptions[name] = { valid: true }

    if (value.dataSources === undefined) return

    const dataSources = (sectionValidation.dataSources ??= {})
    value.dataSources.forEach((dataSource) => {
      const { placeholder, reference, uuid } = dataSource
      if (placeholder || Objects.isEmpty(uuid)) return

      const referenceValidation: Validation = { valid: true }
      if (Objects.isEmpty(reference)) {
        referenceValidation.valid = false
        referenceValidation.messages = [{ key: 'generalValidation.notEmpty' }]
      }
      dataSources[uuid] = { reference: referenceValidation }
    })
  })

  return validations
}
