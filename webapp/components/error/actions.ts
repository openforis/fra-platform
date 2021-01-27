// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
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
