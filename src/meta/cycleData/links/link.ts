import { CountryIso } from 'meta/area/countryIso'
import { DescriptionLinkLocation, DescriptionLinkLocationKey } from 'meta/cycleData/links/descriptionLink'
import {
  NationalDataPointLinkLocation,
  NationalDataPointLinkLocationKey,
} from 'meta/cycleData/links/nationalDataPointLink'

export type LinkLocation = DescriptionLinkLocation | NationalDataPointLinkLocation

export type LinkLocationKey = DescriptionLinkLocationKey | NationalDataPointLinkLocationKey

export enum LinkValidationStatusCode {
  empty = 'empty',
  enotfound = 'enotfound',
  invalidEmailAddress = 'invalidEmailAddress',
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
