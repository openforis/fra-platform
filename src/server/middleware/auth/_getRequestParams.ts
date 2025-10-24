import { Request } from 'express'

export const _getRequestParams = <PARAMS>(req: Request): PARAMS => {
  return { ...req.params, ...req.query, ...req.body } as PARAMS
}
