import { NextFunction, Request, Response } from 'express'

import { Promises } from 'utils/promises'

import { validators } from 'server/middleware/apiContext/validateQueryParams/validators'

import { _getInvalidQueryParamError } from './_getInvalidQueryParamError'

const _validateParam = async (paramName: string, params: Record<string, string | Array<string>>): Promise<void> => {
  const validate = validators[paramName]
  const value = params[paramName]
  if (value === undefined) return

  const isValid = await validate(value, params)
  if (!isValid) {
    throw _getInvalidQueryParamError(paramName, value.toString())
  }
}

export const validateQueryParams = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as Record<string, string | Array<string>>
    await Promises.each(Object.keys(validators), (paramName) => _validateParam(paramName, params))
    next()
  } catch (error) {
    next(error)
  }
}
