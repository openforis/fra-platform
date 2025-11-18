import { Request } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { SectionName } from 'meta/assessment/section'

export type CycleDataParams = CountryParams & {
  sectionName: SectionName
}

export type CycleDataRequest<QueryParams = unknown, Body = unknown> = Request<
  never,
  never,
  Body,
  QueryParams & CycleDataParams
>
