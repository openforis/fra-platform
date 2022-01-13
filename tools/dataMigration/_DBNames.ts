export const DBNames = {
  getAssessmentSchema: (assessmentName: string): string => `assessment_${assessmentName}`,
  getCycleSchema: (assessmentName: string, cycleName: string): string => `assessment_${assessmentName}_${cycleName}`,
}
