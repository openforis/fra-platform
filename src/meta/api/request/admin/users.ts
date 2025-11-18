import { Request } from 'express'

import { TablePaginatedDataRequestParams } from 'meta/api/request/tablePaginated'

export type AdminUsersRequest<QueryParams = unknown, Body = unknown> = Request<
  never,
  never,
  Body,
  QueryParams & TablePaginatedDataRequestParams
>
