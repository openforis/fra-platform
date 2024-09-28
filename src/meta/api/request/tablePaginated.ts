import { Request } from 'express'

import { AreaCode } from 'meta/area'
import { AssessmentName, CycleName, SectionName } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

export type TablePaginatedBaseParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso?: AreaCode
  sectionName?: SectionName
}

export type TablePaginatedDataRequestParams = TablePaginatedBaseParams & {
  filters?: string
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

export type TablePaginatedCountRequest = Request<never, never, never, TablePaginatedBaseParams>
