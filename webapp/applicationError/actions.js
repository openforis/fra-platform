import R from 'ramda'

export const applicationErrorType = 'applicationError/error'
export const clearApplicationErrorType = 'applicationError/clear'

export const applicationError = error => {
  console.error(error)
  // If error is a  Fra-platform custom error json object from server
  // we can extract an error message
  // from it
  const detailedErrorMessage = R.path(['response', 'data', 'error'], error)
  const errorMessage = detailedErrorMessage
    ? `${error}: ${detailedErrorMessage}`
    : error
  return {
    type: applicationErrorType,
    error: errorMessage
  }
}

export const clearApplicationError = () => ({
  type: clearApplicationErrorType
})
