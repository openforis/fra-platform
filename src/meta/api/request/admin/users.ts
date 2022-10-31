import { Request } from 'express'

import { CountryIso } from '@meta/area'

export type UsersRequest<QueryParams = any, Body = any> = Request<
  never,
  never,
  Body,
  QueryParams & { countryIso?: CountryIso; limit?: string; offset?: string }
>
