import { NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'
import { UUID } from 'meta/uuid/uuid'

type Props = {
  targets: Array<NDPLinkTarget>
}

// Merges targets of the same national data point into one, so a job never refreshes a national data point twice.
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
