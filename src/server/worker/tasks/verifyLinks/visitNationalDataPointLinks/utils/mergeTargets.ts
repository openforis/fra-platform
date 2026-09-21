import { NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'
import { UUID } from 'meta/uuid/uuid'

type Props = {
  targets: Array<NDPLinkTarget>
}

// Merges targets of the same national data point into one, so a job never refreshes it twice.
// This can happen when a link is approved and it was used in more than one field.
// Example:
//   targets: [{ ndpUuid: 'abc', fields: [commentsExtentOfForest] }, { ndpUuid: 'abc', fields: [dataSourceReferences] }]
//   result:  [{ ndpUuid: 'abc', fields: [commentsExtentOfForest, dataSourceReferences] }]
export const mergeTargets = (props: Props): Array<NDPLinkTarget> => {
  const { targets } = props

  const targetsByNdpUuid: Record<UUID, NDPLinkTarget> = {}

  targets.forEach(({ fields, ndpUuid }) => {
    const target = (targetsByNdpUuid[ndpUuid] ??= { ndpUuid, fields: [] })

    fields.forEach((field) => {
      if (!target.fields.includes(field)) target.fields.push(field)
    })
  })

  return Object.values(targetsByNdpUuid)
}
