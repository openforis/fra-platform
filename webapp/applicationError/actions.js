export const applicationErrorType = 'applicationError/error'

export const applicationError = error => ({
    type: applicationErrorType,
    error: error
})
