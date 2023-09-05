import { Request } from 'express'

import { AssessmentName, CycleName } from 'meta/assessment'

type BaseParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export type TablePaginatedRequest = Request<never, never, never, BaseParams & { limit: string; page: string }>

export type TablePaginatedCountRequest = Request<never, never, never, BaseParams>
