export enum AssessmentType {
  fra2020 = 'fra2020',
  panEuropean = 'panEuropean',
}

export enum AssessmentStatus {
  editing = 'editing',
  accepted = 'accepted',
}

export interface AssessmentSection {
  children: Record<string, AssessmentSectionItem>
  label: string
}

export interface AssessmentSectionItem {
  anchor: string
  name: string
  tables?: Record<string, string>
}

export interface Assessment {
  status?: AssessmentStatus
  type: AssessmentType
  deskStudy?: boolean
  sections?: Record<string, AssessmentSection>
}
