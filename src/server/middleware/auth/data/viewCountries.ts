import { NextFunction, Request, Response } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'

import { AreaController } from 'server/controller/area'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireViewCountries = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryISOs = [] } = _getRequestParams<{ countryISOs?: Array<CountryIso> }>(req)
  const user = Requests.getUser(req)
  const { assessment, cycle } = req.context

  const countriesMap = await AreaController.getCountriesMap({ assessment, countryISOs, cycle })

  const canViewAll = countryISOs.every((countryIso) =>
    Authorizer.canViewCountry({ areaCode: countryIso, assessment, country: countriesMap[countryIso], cycle, user })
  )

  _next(canViewAll, next)
}
