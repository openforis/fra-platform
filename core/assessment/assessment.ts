type AssessmentStatus = 'editing' | 'accepted'

export type AssessmentType = 'fra2020' | 'panEuropean'

export interface Assessment {
  status: AssessmentStatus
  type: AssessmentType
  deskStudy?: boolean
}
