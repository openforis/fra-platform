const R = require('ramda')

function InvalidParameterException (key, values) {
  this.error = {key, values}
  Error.captureStackTrace(this, InvalidParameterException)
}

InvalidParameterException.prototype = Object.create(Error.prototype)
InvalidParameterException.prototype.name = 'InvalidParameterException'
InvalidParameterException.prototype.constructor = InvalidParameterException

const checkParamAllowedValue = (req, paramName, values) => {
  if(R.isNil(req.params[paramName]))
    throw new InvalidParameterException('error.request.invalidValue', {params: req.params})
  if(!R.contains(req.params[paramName], values))
    throw new InvalidParameterException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

const checkParamValue = (req, paramName, allowFn) => {
  if(R.isNil(req.params[paramName]))
    throw new InvalidParameterException('error.request.invalidValue', {params: req.params})
  if(!allowFn(req.params[paramName]))
    throw new InvalidParameterException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

module.exports.readParameterWithAllowedValues = checkParamAllowedValue
module.exports.readAllowedParameter = checkParamValue
