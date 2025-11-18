import { NextFunction, Request, Response } from 'express'

import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { Authorizer, CollaboratorEditPropertyType } from 'meta/user'

import { MetadataController } from 'server/controller/metadata'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

type RequestParams = CycleDataParams & { permission: CollaboratorEditPropertyType }

const _requireEditData = async (req: Request, next: NextFunction): Promise<void> => {
  const { permission, sectionName } = _getRequestParams<RequestParams>(req)
  const user = Requests.getUser(req)
  const { assessment, country, cycle } = req.context
  const section = await MetadataController.getSubSection({ assessment, cycle, sectionName })

  _next(Authorizer.canEditSectionData({ country, cycle, permission, section, user }), next)
}

export const requireEditDescriptions = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const _req = req
  _req.body.permission = CollaboratorEditPropertyType.descriptions

  return _requireEditData(_req, next)
}

export const requireEditTableData = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const _req = req
  _req.body.permission = CollaboratorEditPropertyType.tableData

  return _requireEditData(_req, next)
}
