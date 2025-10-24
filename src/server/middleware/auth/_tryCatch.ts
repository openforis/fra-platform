import { NextFunction, Request, RequestHandler, Response } from 'express'

export const _tryCatch = (f: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await f(req, res, next)
    } catch (e) {
      next(e)
    }
  }
}
