import { describe, expect, test } from 'vitest'

import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { LinksVerificationSummary } from 'meta/cycleData/links/link'

import { checkLinksVerificationGuard, LinksVerificationBlockReason } from './linksVerificationGuard'

describe('checkLinksVerificationGuard', () => {
  const countryIso: CountryIso = 'X01'

  const createCountry = (lastEdit?: string, lastEditOdp?: string): Country =>
    ({
      countryIso,
      lastEdit: lastEdit ?? '2024-01-15T10:00:00Z',
      lastEditOdp: lastEditOdp ?? '2024-01-10T10:00:00Z',
      props: { status: CountryStatus.review },
    }) as Country

  const createVerificationSummary = (
    neverRan: boolean,
    invalidUnapprovedCount: number,
    lastExecutedAt?: string
  ): LinksVerificationSummary => ({
    invalidCount: 0,
    invalidUnapprovedCount,
    lastExecutedAt,
    neverRan,
  })

  describe('when guard allows status change', () => {
    test('should allow when current status is not review', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry(),
        currentStatus: CountryStatus.editing,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(true, 5),
      })

      expect(result).toEqual({ blocked: false })
    })

    test('should allow when target status is not approval', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry(),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.editing,
        verificationSummary: createVerificationSummary(true, 5),
      })

      expect(result).toEqual({ blocked: false })
    })

    test('should allow when all verification checks pass', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry('2024-01-15T10:00:00Z', '2024-01-10T10:00:00Z'),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(false, 0, '2024-01-20T10:00:00Z'),
      })

      expect(result).toEqual({ blocked: false })
    })
  })

  describe('when guard blocks status change', () => {
    test('should block with neverRan reason when verification never ran', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry(),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(true, 0),
      })

      expect(result).toEqual({ blocked: true, reason: LinksVerificationBlockReason.neverRan })
    })

    test('should block with invalidLinks reason when there are unapproved invalid links', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry('2024-01-15T10:00:00Z', '2024-01-10T10:00:00Z'),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(false, 5, '2024-01-20T10:00:00Z'),
      })

      expect(result).toEqual({ blocked: true, reason: LinksVerificationBlockReason.invalidLinks })
    })

    test('should block with staleVerification reason when lastEdit is after verification', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry('2024-01-25T10:00:00Z', '2024-01-10T10:00:00Z'),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(false, 0, '2024-01-20T10:00:00Z'),
      })

      expect(result).toEqual({ blocked: true, reason: LinksVerificationBlockReason.staleVerification })
    })

    test('should block with staleVerification reason when lastEditOdp is after verification', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry('2024-01-10T10:00:00Z', '2024-01-25T10:00:00Z'),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(false, 0, '2024-01-20T10:00:00Z'),
      })

      expect(result).toEqual({ blocked: true, reason: LinksVerificationBlockReason.staleVerification })
    })

    test('should block with staleVerification reason when both lastEdit and lastEditOdp are after verification', () => {
      const result = checkLinksVerificationGuard({
        country: createCountry('2024-01-25T10:00:00Z', '2024-01-22T10:00:00Z'),
        currentStatus: CountryStatus.review,
        targetStatus: CountryStatus.approval,
        verificationSummary: createVerificationSummary(false, 0, '2024-01-20T10:00:00Z'),
      })

      expect(result).toEqual({ blocked: true, reason: LinksVerificationBlockReason.staleVerification })
    })
  })
})
