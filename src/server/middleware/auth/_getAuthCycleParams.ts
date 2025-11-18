import { NextFunction, Request } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { AreaCode } from 'meta/area/areaCode'
import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
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

  let { assessment, cycle } = req.context
  const { country } = req.context
  const user = Requests.getUser(req)

  if (assessmentName !== assessment.props.name || cycleName !== cycle.name) {
    const assessmentCycle = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    assessment = assessmentCycle.assessment
    cycle = assessmentCycle.cycle
  }

  return { assessment, cycle, country, countryIso, user }
}
