import { Request } from 'express'

import { AssessmentName } from 'meta/assessment/assessment'

export type LoginRequest = Request<
  unknown,
  unknown,
  unknown,
  { assessmentName: AssessmentName; cycleName: string; invitationUuid: string }
>
