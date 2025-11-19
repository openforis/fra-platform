import { Request } from 'express'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type CycleParams = {
  assessmentName: AssessmentName
  cycleName: CycleName
}

export type CycleRequest<QueryParams = unknown, Body = unknown> = Request<never, never, Body, QueryParams & CycleParams>
