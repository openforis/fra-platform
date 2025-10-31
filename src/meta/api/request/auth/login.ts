import { Request } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'

export type LoginRequest = Request<
  unknown,
  unknown,
  unknown,
  { assessmentName: AssessmentName; countryIso?: CountryIso; cycleName: string; invitationUuid?: string }
>
