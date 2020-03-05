export const assessmentLockUpdate = 'assessment/lock/update'

export const toggleAssessmentLock = (assessmentType, lock) => ({ type: assessmentLockUpdate, assessmentType, lock })
