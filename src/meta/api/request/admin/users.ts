import { Request } from 'express'

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
