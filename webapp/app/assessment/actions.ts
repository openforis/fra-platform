// ====== Lock

export const assessmentLockUpdate = 'assessment/lock/update'

export const toggleAssessmentLock = (assessmentType: any, lock: any) => ({
  type: assessmentLockUpdate,
  assessmentType,
  lock,
})

// ====== Section

export const assessmentSectionPropUpdate = 'assessment/section/prop/update'

export const updateSectionProp = (assessmentType: any, sectionName: any, propName: any, propValue: any) => ({
  type: assessmentSectionPropUpdate,
  assessmentType,
  sectionName,
  propName,
  propValue,
})
