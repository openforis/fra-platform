import { Request } from 'express'

import { AssessmentName } from 'meta/assessment'

export type LoginRequest = Request<unknown, unknown, unknown, { assessmentName: AssessmentName; cycleName: string; invitationUuid: string }>
