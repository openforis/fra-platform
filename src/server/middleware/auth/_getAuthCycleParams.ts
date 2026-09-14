import { NextFunction, Request } from 'express'

import { CycleParams } from 'meta/api/request/cycle'
import { AreaCode } from 'meta/area/areaCode'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { AssessmentController } from 'server/controller/assessment'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { Requests } from 'server/utils'

type AuthCycleProps = {
  assessment: Assessment
  areaCode: AreaCode
  country?: Country
  cycle: Cycle
  user: User
}

type RequestParams = CycleParams & { authContext?: string; countryIso?: CountryIso; areaCode?: AreaCode }

export const _getAuthCycleParams = async (req: Request, next: NextFunction): Promise<AuthCycleProps> => {
  const params = _getRequestParams<RequestParams>(req)
  const { areaCode: areaCodeParam, authContext, countryIso } = params
  const areaCode = countryIso ?? areaCodeParam
  const { assessmentName, cycleName } = authContext ? JSON.parse(decodeURIComponent(authContext)) : params

  if (!areaCode || !assessmentName || !cycleName) {
    next(new Error(`missingParam ${JSON.stringify({ areaCode, assessmentName, cycleName })}`))
  }

  let { assessment, cycle } = req.context
  const { country } = req.context
  const user = Requests.getUser(req)

  if (assessmentName !== assessment.props.name || cycleName !== cycle.name) {
    const assessmentCycle = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    // eslint-disable-next-line prefer-destructuring
    assessment = assessmentCycle.assessment
    // eslint-disable-next-line prefer-destructuring
    cycle = assessmentCycle.cycle
  }

  return { assessment, areaCode, country, cycle, user }
}
