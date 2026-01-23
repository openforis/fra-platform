import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/countryStatus'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'
import { Dates } from 'utils/dates'

export enum LinksVerificationBlockReason {
  neverRan = 'neverRan',
  invalidLinks = 'invalidLinks',
  staleVerification = 'staleVerification',
}

export type LinksVerificationGuardResult = {
  blocked: boolean
  reason?: LinksVerificationBlockReason
}

type Props = {
  country: Country
  currentStatus: CountryStatus
  targetStatus: CountryStatus
  verificationSummary: LinksVerificationSummary
}

export const checkLinksVerificationGuard = (props: Props): LinksVerificationGuardResult => {
  const { country, currentStatus, targetStatus, verificationSummary } = props

  // Only guard the review -> approval transition
  if (currentStatus !== CountryStatus.review || targetStatus !== CountryStatus.approval) {
    return { blocked: false }
  }

  // Verification never ran
  if (verificationSummary.neverRan) {
    return { blocked: true, reason: LinksVerificationBlockReason.neverRan }
  }

  // Last country edit (data or ODP) is after last verification execution
  if (verificationSummary.lastExecutedAt) {
    const lastExecutedTime = Dates.parseISO(verificationSummary.lastExecutedAt).getTime()
    if (!isNaN(lastExecutedTime)) {
      const lastEditTime = country.lastEdit ? Dates.parseISO(country.lastEdit).getTime() : 0
      const lastEditOdpTime = country.lastEditOdp ? Dates.parseISO(country.lastEditOdp).getTime() : 0
      const latestEditTime = Math.max(lastEditTime, lastEditOdpTime)

      if (latestEditTime > lastExecutedTime) {
        return { blocked: true, reason: LinksVerificationBlockReason.staleVerification }
      }
    }
  }

  // There are invalid unapproved links
  if (verificationSummary.invalidUnapprovedCount > 0) {
    return { blocked: true, reason: LinksVerificationBlockReason.invalidLinks }
  }

  return { blocked: false }
}
