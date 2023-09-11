import { Request } from 'express'

import { AssessmentName, CycleName } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

type BaseParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export type TablePaginatedDataRequestParams = BaseParams & {
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export type TablePaginatedDataRequest = Request<never, never, never, TablePaginatedDataRequestParams>

export type TablePaginatedCountRequest = Request<never, never, never, BaseParams>
