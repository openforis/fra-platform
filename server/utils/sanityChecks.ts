// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

function InvalidParameterException(key: any, values: any) {
  this.error = { key, values }
  Error.captureStackTrace(this, InvalidParameterException)
}

InvalidParameterException.prototype = Object.create(Error.prototype)
InvalidParameterException.prototype.name = 'InvalidParameterException'
InvalidParameterException.prototype.constructor = InvalidParameterException

const checkParamAllowedValue = (req: any, paramName: any, values: any) => {
  if (R.isNil(req.params[paramName]))
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!R.contains(req.params[paramName], values))
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

const checkParamValue = (req: any, paramName: any, allowFn: any) => {
  if (R.isNil(req.params[paramName]))
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  if (!allowFn(req.params[paramName]))
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    throw new InvalidParameterException('error.request.invalidValue', { params: req.params })
  return req.params[paramName]
}

module.exports.readParameterWithAllowedValues = checkParamAllowedValue
module.exports.readAllowedParameter = checkParamValue
