import { Request } from 'express'

import { CountryIso } from '@meta/area'

export type CycleParams = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export type CycleDataParams = CycleParams & {
  // TODO: rename to sectionName
  section: string
}

export type CycleRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleParams>
export type CycleDataRequest<QueryParams = any, Body = any> = Request<never, never, Body, QueryParams & CycleDataParams>
