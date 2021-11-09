import { User } from '@core/auth'

enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
}

export interface ActivityLog<Target> {
  target: Target
  message: ActivityLogMessage
  countryIso: string
  section: string
  user: User
  time?: string
}
