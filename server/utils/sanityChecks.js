const R = require('ramda')

function ParameterInvalidException (key, values) {
  this.error = {key, values}
  Error.captureStackTrace(this, ParameterInvalidException)
}

ParameterInvalidException.prototype = Object.create(Error.prototype)
ParameterInvalidException.prototype.name = 'ParameterInvalidException'
ParameterInvalidException.prototype.constructor = ParameterInvalidException

const checkParamAllowedValue = (req, paramName, values) => {
  if(R.isNil(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  if(!R.contains(req.params[paramName], values))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

const checkParamValue = (req, paramName, allowFn) => {
  if(R.isNil(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  if(!allowFn(req.params[paramName]))
    throw new AccessControlException('error.request.invalidValue', {params: req.params})
  return req.params[paramName]
}

module.exports.readParameterWithAllowedValues = checkParamAllowedValue
module.exports.readAllowedParameter = checkParamValue
