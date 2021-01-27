import * as R from 'ramda'

function InvalidParameterException(key: any, values: any) {
  this.error = { key, values }
  Error.captureStackTrace(this, InvalidParameterException)
}

InvalidParameterException.prototype = Object.create(Error.prototype)
InvalidParameterException.prototype.name = 'InvalidParameterException'
InvalidParameterException.prototype.constructor = InvalidParameterException

const checkParamAllowedValue = (req: any, paramName: any, values: any) => {
  if (R.isNil(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!R.contains(req.params[paramName], values))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

const checkParamValue = (req: any, paramName: any, allowFn: any) => {
  if (R.isNil(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!allowFn(req.params[paramName]))
    // @ts-ignore
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

export const readParameterWithAllowedValues = checkParamAllowedValue
export const readAllowedParameter = checkParamValue
