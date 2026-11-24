import { NextFunction, Request } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { AreaCode } from 'meta/area/areaCode'
import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { _getAuthAssessmentCycle } from 'server/middleware/auth/_getAuthAssessmentCycle'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { Requests } from 'server/utils'

type AuthCycleProps = {
  assessment: Assessment
  country?: Country
  countryIso: AreaCode
  cycle: Cycle
  user: User
}

type RequestParams = CountryParams & { authContext?: string }

export const _getAuthCycleParams = async (req: Request, next: NextFunction): Promise<AuthCycleProps> => {
  const params = _getRequestParams<RequestParams>(req)
  const { authContext, countryIso } = params
  const { assessmentName, cycleName } = authContext ? JSON.parse(decodeURIComponent(authContext)) : params

  if (!countryIso || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ countryIso, assessmentName, cycleName })}`))
  }

  const { country } = req.context
  const user = Requests.getUser(req)
  const { assessment, cycle } = await _getAuthAssessmentCycle({ assessmentName, cycleName, req })

  return { assessment, cycle, country, countryIso, user }
}
