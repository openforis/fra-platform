export const DBNames = {
  getAssessmentSchema: (assessmentName: string): string => `assessment_${assessmentName}`.toLowerCase(),
  getCycleSchema: (assessmentName: string, cycleName: string): string =>
    `assessment_${assessmentName}_${cycleName}`.toLowerCase(),
}
