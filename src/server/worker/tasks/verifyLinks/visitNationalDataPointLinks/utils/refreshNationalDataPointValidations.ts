import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { notifyNationalDataPointValidationUpdate } from 'server/controller/cycleData/validations/nationalDataPoint/notifyNationalDataPointValidationUpdate'

import { buildNationalDataPointLinkValidations } from './buildNationalDataPointLinkValidations'

type Props = {
  approvedLinks: Array<Link>
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
  nationalDataPoints: Array<OriginalDataPoint>
  notifyClients?: boolean
  targets: Array<NDPLinkTarget>
}

// Rebuilds the target national data points' link validations, saves them in the cache and notifies clients.
export const refreshNationalDataPointValidations = async (props: Props): Promise<void> => {
  const { approvedLinks, assessment, countryIso, cycle, linkVisits, linksToVisit, nationalDataPoints, targets } = props
  const { notifyClients = true } = props

  if (Objects.isEmpty(targets)) return

  const linkValidations = buildNationalDataPointLinkValidations({ approvedLinks, linkVisits, linksToVisit })
  const currentValidations = await NationalDataPointValidationRedisRepository.getValidations({
    assessment,
    countryIso,
    cycle,
  })

  // Emptied national data points are still included in the notification, so clients clear them too.
  const validations: RecordNDPValidations = {}
  const validationsToSet: RecordNDPValidations = {}
  const uuidsToDelete: Array<UUID> = []

  targets.forEach(({ fields, ndpUuid }) => {
    // The odp id is not a validation, so we keep it out of the merge.
    const { odpId: currentOdpId, ...current } = currentValidations[ndpUuid] ?? {}
    const update = linkValidations[ndpUuid] ?? {}
    const value = NationalDataPointValidations.mergeLinkValidations({ current, fields, update })

    if (Objects.isEmpty(value)) {
      uuidsToDelete.push(ndpUuid)
    } else {
      // The odp header cell looks the validation up by odp id.
      const odpId = nationalDataPoints.find(({ uuid }) => uuid === ndpUuid)?.id ?? currentOdpId
      if (!Objects.isNil(odpId)) value.odpId = odpId

      validationsToSet[ndpUuid] = value
    }

    validations[ndpUuid] = value
  })

  await Promise.all([
    NationalDataPointValidationRedisRepository.setValidations({
      assessment,
      countryIso,
      cycle,
      validations: validationsToSet,
    }),
    NationalDataPointValidationRedisRepository.deleteValidations({
      assessment,
      countryIso,
      cycle,
      uuids: uuidsToDelete,
    }),
  ])

  if (!notifyClients) return

  notifyNationalDataPointValidationUpdate({ assessment, countryIso, cycle, validations })
}
