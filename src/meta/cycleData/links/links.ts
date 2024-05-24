import { CountryIso } from 'meta/area'

export type LinkLocation = Record<string, Array<string> | number | string>

export enum LinkValidationStatusCode {
  empty = 'empty',
  enotfound = 'enotfound',
  success = 'success',
  urlParsingError = 'urlParsingError',
}

export type LinkProps = {
  approved?: boolean
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
