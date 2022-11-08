import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

const validateRequest = (checks: Array<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(checks.map((check: ValidationChain) => check.run(req)))

    const result = validationResult(req)
    if (result.isEmpty()) {
      return next()
    }

    const errors = result.array()
    return res.status(400).send(errors)
  }
}

export const ValidationMiddleware = {
  validateRequest,
}
