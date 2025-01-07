import { Request } from 'express'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'

export type UsersRequest<QueryParams = any, Body = any> = Request<
  never,
  never,
  Body,
  QueryParams & TablePaginatedDataRequestParams
>
