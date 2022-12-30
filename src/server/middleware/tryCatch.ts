import { NextFunction, Request, Response } from 'express'

export const tryCatch = (f: any) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await f(req, _res, next)
  } catch (e) {
    next(e)
  }
}
