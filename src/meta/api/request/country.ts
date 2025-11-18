import { Request } from 'express'

import { CycleParams } from 'meta/api/request/cycle'
import { CountryIso } from 'meta/area/countryIso'

export type CountryParams = CycleParams & {
  authContext?: string // authContext is a string created as encodeURIComponent(JSON.stringify({assessmentName, cycleName}))
  countryIso: CountryIso
}

export type CountryRequest<QueryParams = unknown, Body = unknown> = Request<
  never,
  never,
  Body,
  QueryParams & CountryParams
>
