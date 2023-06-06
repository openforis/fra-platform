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
    limit?: string
    offset?: string
    countries?: Array<CountryIso>
    fullName?: string
    roles?: Array<RoleName>
    administrators?: boolean
  }
>
