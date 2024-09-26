import { Request } from 'express'

import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user'

export type UsersRequest<QueryParams = any, Body = any> = Request<
  never,
  never,
  Body,
  QueryParams & {
    assessmentName?: string
    cycleName?: string
    filters?: string
    limit?: string
    offset?: string
    orderBy?: string
    orderByDirection?: string
  }
>

export type DecodedUserFilters = {
  administrators?: boolean
  countries?: Array<CountryIso>
  fullName?: string
  roles?: Array<RoleName>
}
