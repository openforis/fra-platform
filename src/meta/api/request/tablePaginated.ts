import { Request } from 'express'

import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

type BaseParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: AreaCode
}

export type TablePaginatedDataRequestParams = BaseParams & {
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export type TablePaginatedDataRequest<OptionalParams extends Record<string, unknown> = never> = Request<
  never,
  never,
  never,
  TablePaginatedDataRequestParams & OptionalParams
>

export type TablePaginatedCountRequest = Request<never, never, never, BaseParams>
