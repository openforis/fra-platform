export enum AssessmentType {
  fra2020 = 'fra2020',
  panEuropean = 'panEuropean',
}

export enum AssessmentStatus {
  editing = 'editing',
  review = 'review',
  approval = 'approval',
  accepted = 'accepted',
  changing = 'changing',
}

export interface AssessmentSectionItem {
  anchor: string
  name: string
  tables?: Record<string, string>
}

export interface AssessmentSection {
  children: Record<string, AssessmentSectionItem>
  label: string
}

export interface Assessment {
  deskStudy?: boolean
  sections?: Record<string, AssessmentSection>
  status?: AssessmentStatus
  type: AssessmentType
}
