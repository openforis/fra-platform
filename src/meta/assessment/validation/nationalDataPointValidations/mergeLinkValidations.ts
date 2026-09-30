import { NDPDataSourceValidation, NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { NDPCommentLinkFields, NDPLinkField } from 'meta/cycleData/links/nationalDataPointLink'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

type Props = {
  current: NDPValidation
  fields: Array<NDPLinkField>
  update: NDPValidation
}

// Merges an incoming link validation update onto a national data point's current validations
// and returns the result. Only the given fields are updated.
// Example:
//   current: { comments: { extentOfForest: { valid: false } }, year: { valid: false } }
//   fields:  [commentsExtentOfForest]
//   update:  {}
//   result:  { year: { valid: false } }
export const mergeLinkValidations = (props: Props): NDPValidation => {
  const { current, fields, update } = props
  const value: NDPValidation = { ...current }

  // Replace the comment link validations of the given comment fields.
  const comments = { ...current.comments }
  NDPCommentLinkFields.forEach(({ commentKey, linkField }) => {
    if (!fields.includes(linkField)) return

    const commentValidation = update.comments?.[commentKey]
    if (commentValidation) {
      comments[commentKey] = commentValidation
    } else {
      delete comments[commentKey]
    }
  })
  if (!Objects.isEmpty(comments)) {
    value.comments = comments
  } else {
    delete value.comments
  }

  if (fields.includes(NDPLinkField.dataSourceReferences)) {
    // Replace the reference link validation of the ndp's single data source (dataSources v1 cycles)
    if (update.dataSourceReference) {
      value.dataSourceReference = update.dataSourceReference
    } else {
      delete value.dataSourceReference
    }

    // Replace only the reference link validations
    const dataSources: Record<UUID, NDPDataSourceValidation> = {}
    const uuids = new Set([...Object.keys(current.dataSources ?? {}), ...Object.keys(update.dataSources ?? {})])

    uuids.forEach((uuid) => {
      const dataSourceValidation: NDPDataSourceValidation = { ...current.dataSources?.[uuid] }
      delete dataSourceValidation.reference

      const reference = update.dataSources?.[uuid]?.reference
      if (reference) dataSourceValidation.reference = reference

      if (!Objects.isEmpty(dataSourceValidation)) dataSources[uuid] = dataSourceValidation
    })

    if (!Objects.isEmpty(dataSources)) {
      value.dataSources = dataSources
    } else {
      delete value.dataSources
    }
  }

  return value
}
