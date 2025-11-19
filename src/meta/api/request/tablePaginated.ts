import { Request } from 'express'

import { AreaCode } from 'meta/area/areaCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { Lang } from 'meta/lang'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

export type TablePaginatedBaseParams = {
  assessmentName: AssessmentName
  countryIso?: AreaCode
  cycleName: CycleName
  filters?: string
  lang?: Lang
  sectionName?: SectionName
}

export type TablePaginatedDataRequestParams = TablePaginatedBaseParams & {
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export type TablePaginatedDataRequest<OptionalParams extends Record<string, unknown> = Record<string, never>> = Request<
  never,
  never,
  never,
  TablePaginatedDataRequestParams & OptionalParams
>

export type TablePaginatedCountRequest = Request<never, never, never, TablePaginatedBaseParams>
