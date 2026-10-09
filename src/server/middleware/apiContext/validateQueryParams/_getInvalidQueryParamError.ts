type InvalidQueryParamError = Error & { statusCode: number }
export const _getInvalidQueryParamError = (paramName: string, value: string): InvalidQueryParamError => {
  const error = new Error(`Invalid ${paramName}: ${value}`) as InvalidQueryParamError
  error.name = 'InvalidQueryParamError'
  error.statusCode = 400
  return error
}
