import { CountryIso } from 'meta/area/countryIso'
import { DescriptionLinkLocation } from 'meta/cycleData/links/descriptionLink'
import { NationalDataPointLinkLocation } from 'meta/cycleData/links/nationalDataPointLink'

export type LinkLocation = DescriptionLinkLocation | NationalDataPointLinkLocation

export enum LinkValidationStatusCode {
  empty = 'empty',
  enotfound = 'enotfound',
  success = 'success',
  urlParsingError = 'urlParsingError',
}

export type LinkProps = {
  approved?: boolean
  deleted?: boolean
  name: string
}

export type LinkVisit = {
  code: LinkValidationStatusCode
  timestamp: string
}

export type Link = {
  readonly id: number
  readonly uuid: string
  countryIso: CountryIso
  link: string
  locations: Array<LinkLocation>
  props: LinkProps
  visits: Array<LinkVisit>
}

export type LinkToVisit = {
  countryIso: CountryIso
  link: string
  locations: Array<LinkLocation>
  name: string
}

export type VisitedLink = LinkToVisit & LinkVisit

export type LinksVerificationSummary = {
  invalidCount: number
  invalidUnapprovedCount: number
  lastExecutedAt?: string
  neverRan: boolean
}
