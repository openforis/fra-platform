import { CountryIso } from 'meta/area'

export type LinkLocation = {
  column: string
  entityProps: Record<string, string>
  id: number
  table: string
}

export enum LinkValidationStatusCode {
  empty = 'empty',
  enotfound = 'enotfound',
  success = 'success',
  urlParsing = 'urlParsing',
}

export type LinkProps = {
  approved?: boolean
  name: string
  visit: {
    code: LinkValidationStatusCode
  }
  visits: Array<{
    code: LinkValidationStatusCode
    timestamp: string
  }>
}

export type Link = {
  readonly id: number
  readonly uuid: string
  countryIso: CountryIso
  link: string
  location: LinkLocation
  props: LinkProps
  target: string
}
