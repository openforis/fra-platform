import { NextFunction, Request, Response } from 'express'

import { CycleParams } from 'meta/api/request'
import { Authorizer } from 'meta/user'

import { MetadataController } from 'server/controller/metadata'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireViewHistory = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { sectionName } = _getRequestParams<CycleParams & { sectionName: string }>(req)
  const user = Requests.getUser(req)
  const { assessment, country, cycle } = req.context
  const section = await MetadataController.getSubSection({ assessment, cycle, sectionName })

  _next(Authorizer.canViewHistory({ country, cycle, section, user }), next)
}
