import { CountryIso } from 'meta/area'

type LinkLocationBase = {
  colName: string
  id: number
  url: string
}

type DescriptionsLocation = LinkLocationBase & {
  descriptionName: string
  path: Array<string>
  sectionName: string
  uuid?: string
}

type OriginalDataPointLocation = LinkLocationBase & {
  sectionName: 'originalDataPoint'
  year: number
}

export type LinkLocation = DescriptionsLocation | OriginalDataPointLocation

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
