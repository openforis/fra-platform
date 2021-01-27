import * as R from 'ramda'

export const applicationErrorType = 'applicationError/error'
export const clearApplicationErrorType = 'applicationError/clear'

export const applicationError = (error: any) => {
  console.error(error)

  // extract custom Fra-platform error
  const respError = R.pipe(R.path(['response', 'data', 'error']), R.defaultTo(error))(error)

  return {
    type: applicationErrorType,
    error: respError,
  }
}

export const clearApplicationError = () => ({
  type: clearApplicationErrorType,
})
