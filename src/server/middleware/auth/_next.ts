import { NextFunction } from 'express'

export const _next = (allowed: boolean, next: NextFunction): void => {
  if (allowed) return next()

  return next(new Error(`userNotAuthorized`))
}
