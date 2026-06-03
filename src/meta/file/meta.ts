import { Label } from 'meta/assessment/label'

export type FileUsage = {
  sectionName: string
  suffix?: string
  locations: Array<Label>
}
