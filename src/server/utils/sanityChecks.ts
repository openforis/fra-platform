import { Objects } from 'utils/objects'
import { Request } from 'express'

function InvalidParameterException(key: string, values: Array<any>) {
  this.error = { key, values }
  Error.captureStackTrace(this, InvalidParameterException)
}

InvalidParameterException.prototype = Object.create(Error.prototype)
InvalidParameterException.prototype.name = 'InvalidParameterException'
InvalidParameterException.prototype.constructor = InvalidParameterException

const checkParamAllowedValue = (req: Request, paramName: string, values: Array<any>): string => {
  if (Objects.isEmpty(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!values.includes(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

const checkParamValue = (req: Request, paramName: string, allowFn: (x: any) => any): string => {
  if (Objects.isEmpty(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!allowFn(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

export const readParameterWithAllowedValues = checkParamAllowedValue
export const readAllowedParameter = checkParamValue
