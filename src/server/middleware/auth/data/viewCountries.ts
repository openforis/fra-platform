import { NextFunction, Response } from 'express'

import { CycleParams, CycleRequest } from 'meta/api/request/cycle'
import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'
import { Objects } from 'utils/objects'

import { AreaController } from 'server/controller/area'
import { _getAuthAssessmentCycle } from 'server/middleware/auth/_getAuthAssessmentCycle'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import Requests from 'server/utils/requests'

export const requireViewCountries = async (
  req: CycleRequest<{ countryISOs?: Array<CountryIso> }>,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { countryISOs } = req.query
  const params = _getRequestParams<CycleParams & { authContext?: string }>(req)
  const { authContext } = params
  const authCycleParams: CycleParams = authContext ? JSON.parse(decodeURIComponent(authContext)) : params
  const { assessmentName, cycleName } = authCycleParams

  if ([countryISOs, assessmentName, cycleName].some(Objects.isEmpty)) {
    next(new Error(`missingParam ${JSON.stringify({ countryISOs, assessmentName, cycleName })}`))
    return
  }

  const { assessment, cycle } = await _getAuthAssessmentCycle({ assessmentName, cycleName, req })
  const user = Requests.getUser(req)

  const { context } = req
  const countriesMapProps = { assessment: context.assessment, countryISOs, cycle: context.cycle }
  const countriesMap = await AreaController.getCountriesMap(countriesMapProps)

  const canViewAll = countryISOs.every((areaCode) => {
    const country = countriesMap[areaCode]
    return Authorizer.canViewCountry({ areaCode, assessment, country, cycle, user })
  })

  _next(canViewAll, next)
}
