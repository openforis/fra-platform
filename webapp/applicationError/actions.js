export const applicationErrorType = 'applicationError/error'
export const clearApplicationErrorType = 'applicationError/clear'

export const applicationError = error => {
  console.error(error)
  return {
    type: applicationErrorType,
    error: error
  }
}

export const clearApplicationError = () => ({
  type: clearApplicationErrorType
})
