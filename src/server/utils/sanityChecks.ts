import { Request } from 'express'

import { Objects } from 'utils/objects'

function InvalidParameterException(key: string, values: Array<any>): void {
  this.error = { key, values }
  Error.captureStackTrace(this, InvalidParameterException)
}

InvalidParameterException.prototype = Object.create(Error.prototype)
InvalidParameterException.prototype.name = 'InvalidParameterException'
InvalidParameterException.prototype.constructor = InvalidParameterException

const checkParamAllowedValue = (req: Request, paramName: string, values: Array<any>): string => {
  const value = req.params[paramName]

  if (Objects.isEmpty(value) || Array.isArray(value))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!values.includes(value))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return value
}

const checkParamValue = (req: Request, paramName: string, allowFn: (x: any) => any): string => {
  const value = req.params[paramName]

  if (Objects.isEmpty(value) || Array.isArray(value))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!allowFn(value))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return value
}

export const readParameterWithAllowedValues = checkParamAllowedValue
export const readAllowedParameter = checkParamValue
