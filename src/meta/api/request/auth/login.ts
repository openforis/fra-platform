import { Request } from 'express'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'

export type LoginRequest = Request<
  unknown,
  unknown,
  unknown,
  { assessmentName: AssessmentName; countryIso?: CountryIso; cycleName: string; invitationUuid?: string }
>
