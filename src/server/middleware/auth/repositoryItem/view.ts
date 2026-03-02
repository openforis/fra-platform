import { NextFunction, Request, Response } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { Authorizer } from 'meta/auth/authorizer'

import { CycleDataController } from 'server/controller/cycleData'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireViewRepositoryItem = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso: areaCode, uuid } = _getRequestParams<CountryParams & { uuid: string }>(req)
  const { assessment, cycle } = req.context
  const repositoryItem = await CycleDataController.Repository.getOne({ uuid })
  const user = Requests.getUser(req)
  const { country } = req.context

  _next(Authorizer.canViewRepositoryItem({ assessment, cycle, country, areaCode, user, repositoryItem }), next)
}
