export const applicationErrorType = 'applicationError/error'
export const clearApplicationErrorType = 'applicationError/clear'

export const applicationError = error => ({
    type: applicationErrorType,
    error: error
})

export const clearApplicationError = () => ({
    type: clearApplicationErrorType
})
