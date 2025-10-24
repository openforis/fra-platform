import { NextFunction, Request, RequestHandler, Response } from 'express'
// import { RequestHandler } from 'express-serve-static-core'

export const _tryCatch = (f: RequestHandler) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await f(req, _res, next)
    } catch (e) {
      next(e)
    }
  }
}
