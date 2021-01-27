// ====== Lock

export const assessmentLockUpdate = 'assessment/lock/update'

export const toggleAssessmentLock = (assessmentType, lock) => ({ type: assessmentLockUpdate, assessmentType, lock })

// ====== Section

export const assessmentSectionPropUpdate = 'assessment/section/prop/update'

export const updateSectionProp = (assessmentType, sectionName, propName, propValue) => ({
  type: assessmentSectionPropUpdate,
  assessmentType,
  sectionName,
  propName,
  propValue,
})
